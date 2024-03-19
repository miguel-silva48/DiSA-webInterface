import React from "react";

import { RiDownloadFill } from 'react-icons/ri';

const DocumentSetContent = () => {

  const num_files = 0;


  const handleDownloadFile = () => {
    //TODO - Handle download file
    console.log("TODO - Handle download file");
  };

  return (
    <div className="flex justify-start">
      <form className="w-2/3 border-4 border-gray-600 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-center mb-4">{num_files} Available files</h2>
        <hr className="border-t border-purple-500 mb-4" />
        <div className="flex flex-col mb-4">
          <table className="text-xl text-gray-600">
            <thead>
              <tr className="font-bold">
                <th className="w-1/3">Name</th>
                <th className="w-1/3">Type</th>
                <th className="w-1/3">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>File 1</td>
                <td>pdf</td>
                <td>1.5 MB</td>
                <div className="relative group">
                  <RiDownloadFill className="text-2xl cursor-pointer" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-center opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out bg-black text-white p-1 rounded">
                    Download File
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default DocumentSetContent;