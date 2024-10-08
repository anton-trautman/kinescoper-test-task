import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  List,
  ListItemContainer,
  AppContainer,
  ItemContent,
  Button,
  GlobalStyle,
} from "./styled";
interface ListItem {
  id: string;
  text: string;
  children: ListItem[];
}

// in case of i18n
const dict = {
  add: "Добавить",
  delete: "Удалить",
  root: "Корневой элемент",
  new: "Вложенный элемент",
  title: "Вложенный список",
};

const NestedList: React.FC<{
  items: ListItem[];
  onAdd: (parentId: string) => void;
  onDelete: (id: string) => void;
}> = ({ items, onAdd, onDelete }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItemContainer key={item.id}>
          <ItemContent>
            <span>{item.text}</span>
            <Button onClick={() => onAdd(item.id)}>{dict.add}</Button>
            {item.id !== dict.root && (
              <Button onClick={() => onDelete(item.id)}>{dict.delete}</Button>
            )}
          </ItemContent>
          {item.children.length > 0 && (
            <NestedList
              items={item.children}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          )}
        </ListItemContainer>
      ))}
    </List>
  );
};

const App: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([
    { id: dict.root, text: dict.root, children: [] },
  ]);

  const addItem = useCallback(
    (parentId: string) => {
      const newItem: ListItem = {
        id: uuidv4(),
        text: `${dict.new} ${Math.floor(Math.random() * 1000)}`,
        children: [],
      };

      const updateItems = (items: ListItem[]): ListItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newItem] };
          }
          if (item.children.length > 0) {
            return { ...item, children: updateItems(item.children) };
          }
          return item;
        });
      };

      setList(updateItems(list));
    },
    [list]
  );

  const deleteItem = useCallback(
    (id: string) => {
      const updateItems = (items: ListItem[]): ListItem[] => {
        return items.filter((item) => {
          if (item.id === id) {
            return false;
          }
          if (item.children.length > 0) {
            item.children = updateItems(item.children);
          }
          return true;
        });
      };

      setList(updateItems(list));
    },
    [list]
  );

  return (
    <AppContainer>
      <GlobalStyle />
      <h1>{dict.title}</h1>
      <NestedList items={list} onAdd={addItem} onDelete={deleteItem} />
    </AppContainer>
  );
};

export default App;
