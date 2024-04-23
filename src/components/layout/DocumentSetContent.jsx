import React from "react";
import { RiDownloadFill } from 'react-icons/ri';

const DocumentSetContent = ({ documents }) => {
 const num_files = documents.length;

 const handleDownloadFile = (fileId) => {
    //TODO - Handle download file
    console.log("TODO - Handle download file for file ID:", fileId);
 };

 return (
    <div className="flex justify-start">
      <form className="w-2/3 border-4 border-gray-600 rounded-lg p-2">
        <h2 className="text-2xl font-bold text-center mb-2">{num_files} Available files</h2>
        <hr className="border-t border-purple-500 mb-2" />
        <div className="flex flex-col mb-2">
          <table className="text-xl text-gray-600">
            <thead>
              <tr className="font-bold">
                <th className="w-1/3">File Name</th>
                <th className="w-1/3">Type</th>
                <th className="w-1/3">Size</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => {
                const nameParts = document.name.split('.');
                const fileName = nameParts[0];
                const fileType = nameParts.length > 1 ? nameParts[1] : 'unknown';

                return (
                 <tr key={document.id} className="text-center">
                    <td>{fileName}</td>
                    <td>{fileType}</td>
                    <td>{document.size} bytes</td>
                    <div className="relative group">
                      <RiDownloadFill className="text-2xl cursor-pointer" onClick={() => handleDownloadFile(document.id)} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-center opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out bg-black text-white p-1 rounded">
                        Download File
                      </div>
                    </div>
                 </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
 );
};

export default DocumentSetContent;
