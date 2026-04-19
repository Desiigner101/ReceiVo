const TABLE_NAME = 'u_x_1984201_receivo_receipt';
const TABLE_API = `/api/now/table/${TABLE_NAME}`;
const FETCH_API = `${TABLE_API}?sysparm_query=ORDERBYDESCsys_created_on&sysparm_display_value=true`

const getCsrfToken = () => {
  return window.g_ck || window.gel?.('sysparm_ck') || '';
};

const getHeaders = (isFormData = false) => {
  const headers = {
    'Accept': 'application/json',
    'X-UserToken': getCsrfToken(),
    'X-Requested-With': 'XMLHttpRequest'
  };
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const createReceipt = async (payload) => {
  console.log('PAYLOAD BEING SENT:', JSON.stringify(payload, null, 2));

  const res = await fetch(TABLE_API, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('SERVER ERROR:', errorText);
    throw new Error(`createReceipt failed: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  console.log('CREATE RESPONSE:', data);
  return data;
};

export const uploadReceiptImage = async (sysId, file) => {
  const formData = new FormData();
  formData.append('table_name', TABLE_NAME);
  formData.append('table_sys_id', sysId);
  formData.append('uploadFile', file);

  const res = await fetch('/api/now/attachment/upload', {
    method: 'POST',
    headers: getHeaders(true),
    body: formData,
    credentials: 'include'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`uploadReceiptImage failed: ${res.status} - ${errorText}`);
  }

  return res.json();
};

export const updateReceiptImageUrl = async (sysId, imageUrl) => {
  const res = await fetch(`${TABLE_API}/${sysId}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ u_image_url: imageUrl }),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`updateReceiptImageUrl failed: ${res.status} - ${errorText}`);
  }

  return res.json();
};

const extractVal = (field) => {
  if (field === null || field === undefined) return null;
  if (typeof field === 'object' && 'value' in field) return field.value;
  return field;
};

export const fetchReceipts = async () => {
  const res = await fetch(FETCH_API, 
    {    
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`fetchReceipts failed: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  const receipts = Array.isArray(data.result) ? data.result : [];

  return receipts.map(r => ({
    // identity
    sys_id:                   extractVal(r.sys_id),

    // core receipt fields
    u_receipt_number:         extractVal(r.u_receipt_number),
    u_store:                  extractVal(r.u_store),
    u_category:               extractVal(r.u_category),
    u_date:                   extractVal(r.u_date),
    u_purchase_date:          extractVal(r.u_purchase_date),
    u_amount:                 extractVal(r.u_amount),
    u_currency:               extractVal(r.u_currency) || 'PHP',
    u_invoice_number:         extractVal(r.u_invoice_number),
    u_purpose:                extractVal(r.u_purpose),

    // image
    u_image_url:              extractVal(r.u_image_url),
    u_image_name:             extractVal(r.u_image_name),
    image_url:                extractVal(r.u_image_url),

    // warranty
    u_warranty:               extractVal(r.u_warranty) || 'None',
    u_warranty_duration:      extractVal(r.u_warranty_duration),
    u_warranty_end_date:      extractVal(r.u_warranty_end_date),
    u_brand:                  extractVal(r.u_brand),
    u_product_name:           extractVal(r.u_product_name),
    u_serial_number:          extractVal(r.u_serial_number),

    // claim & notifications
    u_intended_claim_type:    extractVal(r.u_intended_claim_type),
    u_notification_rules:     extractVal(r.u_notification_rules),
    u_notifications_enabled:  extractVal(r.u_notifications_enabled),
  }));
};

const extractSysId = (res) => {
  const raw = res?.result?.sys_id?.value ?? res?.result?.sys_id ?? null;
  return typeof raw === 'string' && raw.length > 0 ? raw : null;
};

export const addReceiptWithImage = async (payload, file) => {
  try {
    const receiptRes = await createReceipt(payload);
    const sysId = extractSysId(receiptRes);

    if (!sysId) {
      console.error('FULL RESPONSE:', receiptRes);
      throw new Error('Table API did not return a sys_id');
    }

    let imageUrl = null;

    if (file) {
      const uploadRes = await uploadReceiptImage(sysId, file);
      const attachmentSysId = uploadRes?.result?.sys_id?.value ?? uploadRes?.result?.sys_id;

      if (attachmentSysId) {
        imageUrl = `/api/now/attachment/${attachmentSysId}/file`;
        await updateReceiptImageUrl(sysId, imageUrl);
      }
    }

    return {
      success: true,
      sysId,
      imageUrl,
      imageUploaded: Boolean(file && imageUrl)
    };

  } catch (err) {
    console.error('addReceiptWithImage failed:', err);
    return {
      success: false,
      error: err.message || String(err)
    };
  }
};

export const deleteReceipt = async (sysId) => {
  const res = await fetch(`${TABLE_API}/${sysId}`, {
    method: 'DELETE',
    headers: getHeaders(),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`deleteReceipt failed: ${res.status} - ${errorText}`);
  }

  return true;
};

export const fileClaim = async (receiptID) => {
  const res = await fetch(`${TABLE_API}/file-claim`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify({ receiptId: receiptID })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`fileClaim failed: ${res.status} - ${errorText}`);
  }

  return await res.json();
};