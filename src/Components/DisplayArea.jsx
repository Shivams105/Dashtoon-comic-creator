import React from "react";

const DisplayArea = ({ images, loadingStates }) => {
  console.log(images);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-2">
      {images?.map((image, index) => (
        <React.Fragment key={index}>
          {loadingStates[index + 1] ? (
            <div className="relative w-full h-64 bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600 text-lg font-semibold">Loading...</p>
            </div>
          ) : (
            <>
              {image && (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Comic Panel ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DisplayArea;
