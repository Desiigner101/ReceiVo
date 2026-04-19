import React, { useState } from "react";
import { fileClaim } from "../api/receiptService";

export const FileClaimButton = ({ receipt, onClaim }) => {
  const [isFiling, setIsFiling] = useState(false);

  const handleFileClaim = async () => {
    if (!receipt) return;

    const id = receipt.sys_id || receipt.id;
    
    setIsFiling(true);
    try {
      await fileClaim(id);

      if (onClaim) onClaim(id);


    } catch (err) {
      alert('Failed to file claim: ' + err.message);
    } finally {
      setIsFiling(false);
    }
  };

  return (
    <button
      className="btn-download-receipt"
      onClick={handleFileClaim}
      disabled={isFiling}
      style={{ opacity: isFiling ? 0.7 : 1, cursor: isFiling ? 'not-allowed' : 'pointer' }}
    >
      {isFiling ? "FILING..." : "FILE CLAIM"}
    </button>
  );
};