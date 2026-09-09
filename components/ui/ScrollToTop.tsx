"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      id="scroll-to-top"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-[30px] bottom-[100px] z-[998] flex h-[50px] w-[50px] items-center justify-center rounded-full border-none bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] max-[768px]:right-[20px] max-[768px]:bottom-[80px] max-[768px]:h-[45px] max-[768px]:w-[45px] ${visible ? "translate-y-0 opacity-100 visible" : "translate-y-5 opacity-0 invisible"}`}
    >
      <span aria-hidden="true" className="text-[1.25rem] text-white max-[768px]:text-[1.1rem]">
        ↑
      </span>
    </button>
  );
}
