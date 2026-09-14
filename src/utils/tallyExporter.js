/**
 * Tally Prime & Tally.ERP 9 XML Voucher Exporter & Integrator
 * Generates official Tally XML schema for Journal Vouchers & Daybook entries
 */

export const generateTallyVoucherXml = (requests = [], companyName = 'Stavya Spine Hospital Pvt Ltd', ledgerConfig = {}) => {
  const discountLedger = ledgerConfig.discountLedger || 'Hospital Discount Allowed';
  const debtorLedger = ledgerConfig.debtorLedger || 'Sundry Debtors - Patients';
  const revenueLedger = ledgerConfig.revenueLedger || 'Hospital Billing Revenue';

  const approvedRequests = requests.filter(r => r.status === 'APPROVED' || r.status?.startsWith('APPROVED'));

  const voucherXmlEntries = approvedRequests.map((req, idx) => {
    const amount = Number(req.calculatedDiscountAmount || 0);
    const dateStr = req.createdAt ? new Date(req.createdAt).toISOString().split('T')[0].replace(/-/g, '') : new Date().toISOString().split('T')[0].replace(/-/g, '');
    const formattedDate = dateStr;
    const narration = `Discount granted for Patient ${req.patientName} (ID: ${req.patientId}) - Ref: ${req.requestCode} - Doctor: ${req.doctorName || 'N/A'} - Reason: ${req.reasonCategory || 'Medical Grant'}`;

    return `
    <VOUCHER VCHTYPE="Journal" ACTION="Create" OBJVIEW="Accounting Voucher View">
      <DATE>${formattedDate}</DATE>
      <NARRATION>${escapeXml(narration)}</NARRATION>
      <VOUCHERTYPENAME>Journal</VOUCHERTYPENAME>
      <VOUCHERNUMBER>DISC-${req.requestCode || (1000 + idx)}</VOUCHERNUMBER>
      <FBTPAYMENTTYPE>Default</FBTPAYMENTTYPE>
      <PERSISTEDVIEW>Accounting Voucher View</PERSISTEDVIEW>
      
      <!-- Debit: Discount Allowed Account -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${escapeXml(discountLedger)}</LEDGERNAME>
        <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
        <AMOUNT>-${amount.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
      
      <!-- Credit: Patient Sundry Debtor Account -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${escapeXml(debtorLedger)} (${escapeXml(req.patientName)})</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${amount.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
    </VOUCHER>`;
  }).join('\n');

  return `<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>${escapeXml(companyName)}</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
${voucherXmlEntries || '          <!-- No approved discount vouchers to export -->'}
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;
};

const escapeXml = (str = '') => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Parse XML exported from Tally ERP / Tally Prime
 */
export const parseTallyExportXml = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const vouchers = xmlDoc.getElementsByTagName('VOUCHER');
    const parsedRecords = [];

    for (let i = 0; i < vouchers.length; i++) {
      const v = vouchers[i];
      const vNo = v.getElementsByTagName('VOUCHERNUMBER')[0]?.textContent || `TALLY-${i + 1}`;
      const date = v.getElementsByTagName('DATE')[0]?.textContent || '';
      const narration = v.getElementsByTagName('NARRATION')[0]?.textContent || '';
      const ledgerEntries = v.getElementsByTagName('ALLLEDGERENTRIES.LIST');
      
      let amount = 0;
      let partyName = 'Tally Party';

      for (let j = 0; j < ledgerEntries.length; j++) {
        const name = ledgerEntries[j].getElementsByTagName('LEDGERNAME')[0]?.textContent || '';
        const amt = parseFloat(ledgerEntries[j].getElementsByTagName('AMOUNT')[0]?.textContent || '0');
        if (amt < 0) {
          amount = Math.abs(amt);
        } else if (name && !name.includes('Discount')) {
          partyName = name.replace(/\(.*\)/, '').trim();
        }
      }

      parsedRecords.push({
        id: `tally_${Date.now()}_${i}`,
        requestCode: vNo,
        patientName: partyName || 'Tally Imported Patient',
        totalBillAmount: amount > 0 ? amount * 4 : 50000,
        calculatedDiscountAmount: amount || 5000,
        requestedDiscountVal: 10,
        requestedDiscountType: 'AMOUNT',
        reasonCategory: 'Tally Accounting Sync',
        department: 'Billing & Accounts',
        doctorName: 'Dr. Tally ERP',
        status: 'APPROVED',
        remarks: `Merged from Tally ERP 9 / Tally Prime. Narration: ${narration}`,
        importedFromTally: true
      });
    }

    return { success: true, records: parsedRecords };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
