import {
  getPhotos,
  addMultiplePhoto,
  deletePhoto,
} from "/src/services/PhotoService";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PhotoContext = createContext();

export const PhotoProvider = (props) => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  // FETCH FUNCTIONS
  const fetchPhotos = () => {
    getPhotos()
      .then((response) => {
        if (response.status == 200) setPhotos(response.data);
        else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddPhoto = (formData) => {
    addMultiplePhoto(formData)
      .then((response) => {
        if (response.status == 200) {
          alert("Add operation successful!");
          navigate("/photos");
        } else alert(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeletePhoto = ({ id }) => {
    deletePhoto(id)
      .then((response) => {
        if (response.status == 204) {
          alert("Operation successful!");
          fetchPhotos();
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        fetchPhotos,
        handleAddPhoto,
        handleDeletePhoto,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};
