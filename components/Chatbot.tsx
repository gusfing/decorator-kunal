"use client";

import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-fade-in-up transition-all duration-300">
          <a
            href="https://wa.me/918910847179"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            title="Chat on WhatsApp"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.548 4.14 1.584 5.95l-1.637 5.975 6.113-1.603a11.966 11.966 0 005.971 1.603c6.645 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zM12.031 22.046a9.98 9.98 0 01-5.11-1.405l-.366-.217-3.799.996 1.015-3.706-.238-.378A9.975 9.975 0 012.08 12.03c0-5.498 4.475-9.974 9.951-9.974 5.497 0 9.973 4.476 9.973 9.974 0 5.499-4.476 9.974-9.973 9.974zm5.474-7.483c-.3-.151-1.776-.877-2.052-.977-.275-.101-.476-.151-.676.151-.2.302-.776.977-.951 1.178-.175.201-.35.226-.65.075-1.488-.73-2.527-1.407-3.486-2.924-.225-.357.225-.333.669-1.222.101-.2.051-.376-.025-.526-.075-.151-.676-1.628-.926-2.228-.244-.587-.492-.507-.676-.517-.175-.01-.375-.01-.576-.01-.2 0-.526.075-.801.376-.275.301-1.051 1.026-1.051 2.5 0 1.474 1.076 2.898 1.226 3.099.151.201 2.112 3.22 5.115 4.515 1.761.763 2.45.894 3.328.75.981-.161 2.766-1.129 3.155-2.217.388-1.088.388-2.02.272-2.217-.116-.196-.416-.296-.716-.447z" />
            </svg>
          </a>
          
          <a
            href="tel:+918910847179"
            className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            title="Call Us"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-16 h-16 bg-[#C9A84C] text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
