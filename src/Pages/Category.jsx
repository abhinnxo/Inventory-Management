import React, { useState } from "react";
import { useParams } from "react-router";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

export const Category = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const params = useParams();

  function Header() {
    return (
      <>
        <Button
          size="lg"
          variant="primary"
          //  onClick={() => setCreateCategoryModalShow(true)}
        >
          + Add Items
        </Button>
        <Button
          size="lg"
          variant="danger"
          //  onClick={() => setDeleteModalShow(true)}
        >
          - Delete Items
        </Button>
      </>
    );
  }

  //  Display Items
  function ItemList() {
    return (
      <Container>
        <h3>Items</h3>
        {items.map((cat, key) => (
          <Card body style={{ cursor: "pointer" }} key={key} value={cat.name}>
            {cat.name}
          </Card>
        ))}
      </Container>
    );
  }
  return (
    <>
      <div className="my-5 text-center">
        <h3>{params.id} </h3>
      </div>

      <br />
      <Container className="d-flex justify-content-around">
        <Header />
      </Container>
      <br />
      <ItemList />
    </>
  );
};
