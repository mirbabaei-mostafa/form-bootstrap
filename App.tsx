import React, { FormEvent, useReducer, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { v4 as uid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

const categoryList = ["Schue"];
const formData = {
  title: "",
  description: "",
  price: 0,
  category: "",
  tags: [],
  count: 0,
};

interface formDataList {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  count: number;
}

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "input":
      return { ...state, [action.data.name]: action.data.value };
    case "tags":
      return { ...state, tags: action.tag };
    case "count":
      return { ...state, count: action.count };
    default:
      return state;
  }
};

const handelForm = (e: FormEvent) => {
  e.preventDefault();
};

const App = () => {
  const [records, setRecords] = useState<formDataList[]>([]);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const [state, dispatch] = useReducer(reducerFunc, formData);

  const handelInputChange = (event: FormEvent) => {
    dispatch({
      type: "input",
      data: { name: event.target.name, value: event.target.value },
    });
  };

  const handelTags = () => {
    dispatch({ type: "tags", tag: tagsRef.current!.value.split(",") });
    console.log(state);
  };

  const handelForm = (event: FormEvent) => {
    event.preventDefault();

    setRecords([
      ...records,
      {
        id: uid(),
        title: state.title,
        description: state.description,
        price: state.price,
        category: state.category,
        tags: state.tags,
        count: state.count,
      },
    ]);

    dispatch({
      type: "input",
      data: { name: "title", value: "" },
    });
    dispatch({
      type: "input",
      data: { name: "description", value: "" },
    });
    dispatch({
      type: "input",
      data: { name: "price", value: "" },
    });
    dispatch({
      type: "input",
      data: { name: "count", value: 0 },
    });
    tagsRef.current!.value = "";
  };

  const deleteHandel = (id: string) => {
    setRecords(records.filter((record) => record.id != id));
  };

  return (
    <Container className="my-4">
      <Stack gap={5}>
        <Form onSubmit={handelForm}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Titel</Form.Label>
                <Form.Control
                  onChange={handelInputChange}
                  type="text"
                  name="title"
                  required
                  value={state.title}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Erklärung</Form.Label>
                <Form.Control
                  onChange={handelInputChange}
                  type="text"
                  name="description"
                  required
                  value={state.description}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Preise</Form.Label>
                <Form.Control
                  onChange={handelInputChange}
                  type="number"
                  name="price"
                  required
                  value={state.price}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="category">
                <Form.Label>Kategorie</Form.Label>
                <Form.Select
                  onChange={handelInputChange}
                  required
                  name="category"
                  value={state.category}
                >
                  <option></option>
                  <option value="Schue">Schue</option>
                  <option value="Hemd">Hemd</option>
                  <option value="Hose">Hose</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Schilde</Form.Label>
                <Form.Control
                  ref={tagsRef}
                  placeholder="tags seperated with ','"
                  onChange={handelTags}
                  // value={state.tags.map((tag) => {
                  //   return tag + ",";
                  // })}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Button className="prmary" onClick={handelTags}>
                select tag
              </Button>
            </Col>
          </Row> */}
          <Row className="justify-content-md-center">
            <Col>
              <Stack direction="horizontal" gap={3}>
                <Form.Label>Zahl</Form.Label>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() =>
                    dispatch({ type: "count", count: state.count - 1 })
                  }
                >
                  -
                </Button>
                <span>{state.count}</span>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() =>
                    dispatch({ type: "count", count: state.count + 1 })
                  }
                >
                  +
                </Button>
              </Stack>
            </Col>
            <Col>
              <Button type="submit">Speichern</Button>
            </Col>
          </Row>
        </Form>
      </Stack>
      <p></p>
      <Stack gap={3}>
        {records.map((record) => {
          return (
            <Row className="justify-content-md-center">
              <Col>{record.title}</Col>
              <Col>{record.description}</Col>
              <Col>{record.price}$</Col>
              <Col>{record.category}</Col>
              <Col>
                {record.tags.map((tag) => (
                  <Button variant="outline-secondary" disabled>
                    {tag}
                  </Button>
                ))}
              </Col>
              <Col>{record.count}</Col>
              <Col>
                <Button onClick={() => deleteHandel(record.id)}>Löchen</Button>
              </Col>
            </Row>
          );
        })}
      </Stack>
    </Container>
  );
};

export default App;
