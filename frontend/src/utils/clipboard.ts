import { toast } from "react-toastify";

/**
 * クリップボードにテキストをコピーし、トースト通知を表示する関数
 * @param text コピーするテキスト
 */
export const handleCopy = (
  text: string,
  message: string = "Copied to clipboard! Let's paste it!!"
) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
