"use client"; //

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Backdrop click closes modal */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Content Wrapper */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}