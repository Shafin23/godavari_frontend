import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../../../../../AppProvider/AppProvider";

const AddBoatForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    amenities: {
      cleanRestrooms: false,
      comfortableSeating: false,
      onboardDining: false,
      wifiAccess: false,
      entertainmentSystem: false,
      airConditioning: false,
    },
    safetyFeatures: {
      lifeJackets: false,
      emergencyKit: false,
      fireExtinguishers: false,
    },
    meals: {
      vegNonVeg: false,
      pureVeg: false,
    },
    ownersContactNumber: "",
    photos: [],
  });

  const [previews, setPreviews] = useState([]); // State for previewing images
  const [error, setError] = useState(""); // Error message for image limit
  const {setTrigger} = useContext(AppContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (section, name) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: !formData[section][name],
      },
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if the total images exceed the limit of 3
    if (files.length + previews.length > 3) {
      setError("You can upload a maximum of 3 images.");
      return;
    }

    // Clear the error
    setError("");

    // Add new images and their previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);

    setPreviews(updatedPreviews);
    setFormData({ ...formData, photos: updatedPhotos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for sending multipart data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("capacity", formData.capacity);
    data.append("ownersContactNumber", formData.ownersContactNumber);

    // Append photos to FormData
    formData.photos.forEach((photo) => {
      data.append("photos", photo);
    });

    // Append amenities, safetyFeatures, and meals as JSON strings
    data.append("amenities", JSON.stringify(formData.amenities));
    data.append("safetyFeatures", JSON.stringify(formData.safetyFeatures));
    data.append("meals", JSON.stringify(formData.meals));

    try {
      const response = await axios.post("https://godavari-xm9d.vercel.app/boat/addBoat", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Boat added successfully!");
        setTrigger(prev=>!prev)
        setFormData({
          name: "",
          capacity: "",
          amenities: {
            cleanRestrooms: false,
            comfortableSeating: false,
            onboardDining: false,
            wifiAccess: false,
            entertainmentSystem: false,
            airConditioning: false,
          },
          safetyFeatures: {
            lifeJackets: false,
            emergencyKit: false,
            fireExtinguishers: false,
          },
          meals: {
            vegNonVeg: false,
            pureVeg: false,
          },
          ownersContactNumber: "",
          photos: [],
        });
        setPreviews([]);
      } else {
        toast.error(response.data.message || "Failed to add boat");
      }
    } catch (error) {
      console.error("Error adding boat:", error);
      toast.error("An error occurred while adding the boat.");
    }
  };

  return (
    <div className="mx-auto bg-white p-10 shadow-md rounded-lg">
      {/* Toast container */}
      <ToastContainer />

      <h1 className="text-3xl font-bold text-gray-800 mb-10">Add Boat</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter the name of the boat"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Capacity */}
        <div className="mb-6">
          <label
            htmlFor="capacity"
            className="block text-gray-700 font-medium mb-2"
          >
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter the number of seats on the boat"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Owners Contact Number */}
        <div className="mb-6">
          <label
            htmlFor="ownersContactNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Owner's Contact Number
          </label>
          <input
            type="text"
            id="ownersContactNumber"
            name="ownersContactNumber"
            value={formData.ownersContactNumber}
            onChange={handleInputChange}
            placeholder="Enter the owner's contact number"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-8">
          <label htmlFor="photos" className="block text-gray-700 font-medium mb-2">
            Photos
          </label>
          <div className="border border-dashed border-gray-400 rounded-md px-4 py-16 text-center relative">
            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-gray-500">Drag & drop files here, or click to select files</p>
            <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, and SVG files up to 5MB. Maximum 3 images.</p>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Image Previews */}
          <div className="mt-4 flex space-x-4">
            {previews.map((src, index) => (
              <div key={index} className="relative w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
                <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Amenities</h3>
          <div className="space-y-2">
            {Object.entries(formData.amenities).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("amenities", key)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Safety Features</h3>
          <div className="space-y-2">
            {Object.entries(formData.safetyFeatures).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("safetyFeatures", key)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Meals */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Meals</h3>
          <div className="space-y-2">
            {Object.entries(formData.meals).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("meals", key)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Add Boat
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBoatForm;
