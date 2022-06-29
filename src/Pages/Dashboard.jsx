import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { PencilFill } from "react-bootstrap-icons";

const axios = require("axios");

export default function Dashboard() {
  const navigate = useNavigate();

  const [createCategoryModalShow, setCreateCategoryModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [oldCategoryName, setOldCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  //  Create Category Modal Popup
  function CreateNewCategoryModal(props) {
    const [newCategoryName, setNewCategoryName] = useState("");

    async function createCategory() {
      var data = {
        name: newCategoryName,
      };

      await fetch("http://localhost:1000/api/create-category", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      });
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Category Name"
                value={newCategoryName}
                onChange={(e) => {
                  e.preventDefault();
                  setNewCategoryName(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={createCategory}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  //  Delete Category Modal Popup
  function DeleteCategoryModal(props) {
    const [deleteCategoryName, setDeleteCategoryName] = useState("");

    function deleteCategory() {
      axios
        .delete("http://localhost:1000/api/delete-category", {
          data: {
            name: deleteCategoryName,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setDeleteModalShow(false);
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Existing Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Write the Category Name</h4>
          <Dropdown>
            <Form.Control
              type="text"
              placeholder="Enter New Category Name"
              value={deleteCategoryName}
              onChange={(e) => {
                e.preventDefault();
                setDeleteCategoryName(e.target.value);
              }}
            />
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //  Update Category Modal Popup
  function UpdateCategoryModal(props) {
    const [updateCategoryName, setUpdateCategoryName] = useState("");

    function updateCategory() {
      axios
        .put("http://localhost:1000/api/update-category", {
          data: {
            oldName: oldCategoryName,
            newName: updateCategoryName,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setUpdateModalShow(false);
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Existing Category Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Write new Category Name</h4>
          <Dropdown>
            <Form.Control
              type="text"
              placeholder="Enter New Category Name"
              value={updateCategoryName}
              onChange={(e) => {
                e.preventDefault();
                setUpdateCategoryName(e.target.value);
              }}
            />
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={updateCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //  Create / Delete Category Buttons
  function Header() {
    return (
      <>
        <Button
          size="lg"
          variant="primary"
          onClick={() => setCreateCategoryModalShow(true)}
        >
          + Create Category
        </Button>
        <Button
          size="lg"
          variant="danger"
          onClick={() => setDeleteModalShow(true)}
        >
          - Delete Category
        </Button>
      </>
    );
  }

  // Fetch Categories
  useEffect(() => {
    axios
      .get("http://localhost:1000/api/categories")
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
        console.log(data);
      })
      .catch((err) => {
        alert("some error");
      });
  }, [deleteModalShow, updateModalShow]);

  //  Display Categories
  function CategoryList() {
    return (
      <Container>
        <h3>Categories</h3>
        {categories.map((cat, key) => (
          <Card body key={key} value={cat.name}>
            <div className="d-flex justify-content-between">
              <div
                onClick={() => navigate(`/dashboard/category/${cat.name}`)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </div>
              <div style={{ cursor: "pointer" }}>
                <PencilFill
                  onClick={() => {
                    setUpdateModalShow(true);
                    setOldCategoryName(cat.name);
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </Container>
    );
  }

  return (
    <>
      <div className="my-5 text-center">
        <h1>Admin Dashboard</h1>
      </div>
      <Container className="d-flex justify-content-around">
        <Header />
      </Container>
      <br />
      <CategoryList />
      <CreateNewCategoryModal
        show={createCategoryModalShow}
        onHide={() => setCreateCategoryModalShow(false)}
      />
      <DeleteCategoryModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        categories={categories}
      />
      <UpdateCategoryModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        categories={categories}
      />
    </>
  );
}
