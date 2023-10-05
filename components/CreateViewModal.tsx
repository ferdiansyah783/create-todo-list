import React from "react";

interface Props {
  isActive: boolean;
  onClose: () => void;
}

const CreateViewModal = ({ isActive, onClose }: Props) => {

  return (
    <div className={`absolute z-50 top-[120%] left-[50%] transition-all duration-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-80 bg-[#1b263b] rounded-md border border-pink-500"> 
        <form className="p-3">
          <input
            type="text"
            className="w-full border border-pink-500 bg-[#1b263b] text-[#e0e1dd] py-1 px-3 focus:outline-none rounded-md placeholder:text-sm mb-3"
            placeholder="input view name"
          />
          <div className="flex justify-end space-x-2 text-sm">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded-md text-pink-500 font-semibold border-pink-500">
              cancel
            </button>
            <button className="px-3 py-1 bg-pink-500 rounded-md text-white">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateViewModal;
