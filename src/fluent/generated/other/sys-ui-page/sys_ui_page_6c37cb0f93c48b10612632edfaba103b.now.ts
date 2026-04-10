import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['6c37cb0f93c48b10612632edfaba103b'],
    category: 'general',
    endpoint: 'x_1984201_receivo_vault_page.do',
    html: `<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
  <style>:root {
            --receipt-color: #76aaa1ff;
            --category-device-bg: #e0f7f1ff;
            --category-device-text: #419386ff;
            --category-meds-bg: #e0f2ffff;
            --category-meds-text: #4380a2ff;
            --date-color: rgb(151, 151, 151);
            --warranty-active-bg: #e0f7f1ff;
            --warranty-active-text: #419386ff;
            --warranty-expiring-bg: #fff3d0ff;
            --warranty-expiring-text: #bb8d50ff;
            --warranty-expired-bg: #fff4f6ff;
            --warranty-expired-text: #dbb1b1ff;
            --table-border: #ddd;
        }

        .receipts-table { width: 100%; border-collapse: collapse; }
        .receipts-table th, .receipts-table td { padding: 12px; border-bottom: 1px solid var(--table-border); }
        .receipt-cell { text-align: center; color: var(--receipt-color); }
        .category-pill, .warranty-pill {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
        }

        .category-pill.device { background: var(--category-device-bg); color: var(--category-device-text); }
        .category-pill.meds { background: var(--category-meds-bg); color: var(--category-meds-text); }

        .warranty-pill.active { background: var(--warranty-active-bg); color: var(--warranty-active-text); }
        .warranty-pill.expiring { background: var(--warranty-expiring-bg); color: var(--warranty-expiring-text); }
        .warranty-pill.expired { background: var(--warranty-expired-bg); color: var(--warranty-expired-text); }</style>
  <div id="vault-root"></div>
  <script>
    const mockReceipts = [
            { id: 1, receipt: "RCV-001", store: "Mercury Drug", category: "Meds", date: "January 15, 2025", amount: 450.50, warranty: "Active" },
            { id: 2, receipt: "RCV-002", store: "Southstar Drug", category: "Device", date: "February 20, 2025", amount: 1299.99, warranty: "Active" },
            { id: 3, receipt: "RCV-003", store: "Mercury Drug", category: "Meds", date: "March 10, 2025", amount: 350.75, warranty: "Expiring" },
            { id: 4, receipt: "RCV-004", store: "Southstar Drug", category: "Device", date: "December 5, 2024", amount: 2500.00, warranty: "Expired" }
        ];

        function safe(val) {
            return val ? val : '';
        }

        function renderRow(r) {
            return \`
    <tr>
      <td class="receipt-cell">\${safe(r.receipt)}</td>
      <td>\${safe(r.store)}</td>
      <td>
        <span class="category-pill \${(safe(r.category)).toLowerCase()}">\${safe(r.category)}</span>
      </td>
      <td style="color: var(--date-color)">\${safe(r.date)}</td>
      <td>₱\${(r.amount || 0).toFixed(2)}</td>
      <td>
        <span class="warranty-pill \${(safe(r.warranty)).toLowerCase()}">\${safe(r.warranty)}</span>
      </td>
      <td>
        <button>👁</button>
        <button>✎</button>
        <button>🗑</button>
      </td>
    </tr>
    \`;
        }

        function renderTable(data) {
            if (!data || data.length === 0) {
                return '
    <p>No receipts found</p>
    ';
            }

            return \`
    <table class="receipts-table">
      <thead>
        <tr>
          <th>RECEIPT</th>
          <th>STORE</th>
          <th>CATEGORY</th>
          <th>DATE</th>
          <th>AMOUNT</th>
          <th>WARRANTY</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>\${data.map(renderRow).join('')}</tbody>
    </table>
    \`;
        }

        function renderPage() {
            const root = document.getElementById('vault-root');

            root.innerHTML = \`
    <h2>Digital Vault</h2>
    <p>\${mockReceipts.length} receipts stored</p>
    \${renderTable(mockReceipts)}
            \`;
        }

        renderPage();
  </script>
</j:jelly>`,
})
