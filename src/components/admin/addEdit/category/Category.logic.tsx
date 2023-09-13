'use client';
import { useState, useEffect } from 'react';
import { api } from '@/Utils/api';
import { categoriesProps } from '@/Utils/types';

export const useLogic = (defaultValue: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [nameNewCategory, setNameNewCategory] = useState<string>('');
  const [categorySelected, setCategorySelected] =
    useState<string>(defaultValue);
  const [showWarning, setShowWarning] = useState(false);
  const [allCategories, setAllCategories] = useState<categoriesProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [garbageHover, setGarbageHover] = useState(0);

  async function getCategories() {
    console.log('pega cats');

    await api
      .get('/getcategories')
      .then((res) => {
        console.log('cates: ', res.data.allCategories);
        setAllCategories(res.data.allCategories);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (nameNewCategory) {
      setIsAdded(false);
      setShowWarning(false);
    }
  }, [nameNewCategory]);

  async function addCategory() {
    if (nameNewCategory) {
      setRunSpinner(true);
      await api
        .post('/addcategories', { name: nameNewCategory })
        .then((res) => {
          if (res.data.id) {
            setRunSpinner(false);
            setIsAdded(true);
            setNameNewCategory('');
            setCategorySelected(nameNewCategory);
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
      nameNewCategory,
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
      setNameNewCategory,
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
