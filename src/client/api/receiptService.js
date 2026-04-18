const TABLE_NAME = 'u_x_1984201_receivo_receipt';
const TABLE_API = `/api/now/table/${TABLE_NAME}`;

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

export const fetchReceipts = async () => {
  const res = await fetch(`${TABLE_API}?sysparm_limit=100&sysparm_order_by_desc=sys_created_on`, {
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
    ...r,
    sys_id: r.sys_id?.value ?? r.sys_id,
    image_url: r.u_image_url?.value ?? r.u_image_url ?? null,
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