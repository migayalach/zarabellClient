"use client";
import { useState } from "react";
import { FilePdfOutlined } from "@ant-design/icons";

function TicketOutputs() {
  const [open, setOpen] = useState(false);

  return (
    <section
    // className="mt-14 relative flex items-center justify-center"
    >
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2 h-9 w-auto rounded-md bg-[#19A468] text-white cursor-pointer"
        >
          <FilePdfOutlined />
        </button>
        {open && (
          <div className="absolute bottom-full mb-0.5 w-45 bg-white rounded-md shadow-md">
            {/* <PDFButton8M
              idDetail={idDetail}
              items={items}
              total={subTotal}
              userInfo={userInfo}
              clientInfo={clientInfo}
              date={date}
              cufCode={cufCode}
            />

            <PDFButton
              idDetail={idDetail}
              items={items}
              subTotal={subTotal}
              userInfo={userInfo}
              render="qr"
              date={date}
              clientInfo={clientInfo}
              cufCode={cufCode}
            /> */}
          </div>
        )}
      </div>
    </section>
  );
}

export default TicketOutputs;
