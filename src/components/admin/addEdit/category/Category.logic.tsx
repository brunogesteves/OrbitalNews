'use client';
import { useState, useEffect } from 'react';
import { api } from '@/Utils/api';

interface categoriesProps {
  id: number;
  name: string;
}

export const useLogic = (defaultValue: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [nameCategory, setNameCategory] = useState<string>('');
  const [categorySelected, setCategorySelected] =
    useState<number>(defaultValue);
  const [showWarning, setShowWarning] = useState(false);
  const [allCategories, setAllCategories] = useState<categoriesProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [garbageHover, setGarbageHover] = useState(0);

  async function getCategories() {
    await api
      .get('/getcategories')
      .then((res) => setAllCategories(res.data.allCategories))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (nameCategory) {
      setIsAdded(false);
      setShowWarning(false);
    }
  }, [nameCategory]);

  async function addCategory() {
    if (nameCategory) {
      setRunSpinner(true);
      await api
        .post('/addcategories', { name: nameCategory })
        .then((res) => {
          if (res.data.status) {
            setRunSpinner(false);
            setIsAdded(true);
            setNameCategory('');
            getCategories();
          }
        })
        .catch((error) => console.log(error));
    } else {
      setShowWarning(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setIsAdded(false);
    setErrorMessage(false);
  }

  async function deleteCategory(id: number) {
    await api
      .delete(`/deletecategory/${id}`)
      .then((res) => {
        if (res.data.status) {
          setAllCategories(
            allCategories.filter((category) => category.id != id)
          );
        } else {
          setErrorMessage(true);
        }
      })
      .catch((error) => console.log(error));
  }

  return {
    data: {
      isOpen,
      runSpinner,
      isAdded,
      nameCategory,
      categorySelected,
      showWarning,
      allCategories,
      errorMessage,
      garbageHover,
    },
    methods: {
      setIsOpen,
      setRunSpinner,
      setIsAdded,
      setNameCategory,
      setCategorySelected,
      setShowWarning,
      setAllCategories,
      setErrorMessage,
      addCategory,
      closeModal,
      deleteCategory,
      setGarbageHover,
    },
  };
};
