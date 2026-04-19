export const fetchAttachmentUrl = async (attachmentPath) => {
    const res = await fetch(attachmentPath, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-UserToken': window.g_ck || '',
        'Accept': '*/*',
      }
    });
  
    if (!res.ok) throw new Error(`fetchAttachment failed: ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  };

  export const downloadAttachment = async (attachmentPath, fileName) => {
    const res = await fetch(attachmentPath, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-UserToken': window.g_ck || '',
        'Accept': '*/*',
      }
    });
  
    if (!res.ok) {
      throw new Error(`Download failed: ${res.status}`);
    }
  
    const blob = await res.blob();
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
  
    document.body.appendChild(a);
    a.click();
    a.remove();
  
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };