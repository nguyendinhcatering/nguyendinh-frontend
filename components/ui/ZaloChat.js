import React from "react";

const ZaloChat = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  });

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div
        className="zalo-chat-widget"
        data-oaid={process.env.ZALO_OA_ID || "Test"}
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="0"
        data-width="450"
        data-height="420"
      />
    </div>
  );
};

export default ZaloChat;
