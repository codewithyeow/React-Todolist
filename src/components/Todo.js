import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Spacer,
  Input,
  Button,
  IconButton,
  Checkbox, 
  Badge,
  Box,
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TodoComponents = ({ todos, deleteTodo, editTodo  , checkTodo}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, ''); // Remove spaces from search term

  const filteredTodos = todos.filter((todo) => {
    const formattedTodoBody = todo.body.toLowerCase().replace(/\s+/g, ''); // Remove spaces from todo body
    return formattedTodoBody.includes(formattedSearchTerm);
  });

  // Handle delete
  const handleDelete = (todo) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete "${todo.body}"?`);

    if (shouldDelete) {
      deleteTodo(todo.id);
    }
  };
  const handlecheck = (todo) => {

    checkTodo (todo.id);
  }

  if (!todos.length) {
    return (
      <Badge colorScheme='cyan' p='4' borderRadius='lg'>
        Enter New Task 👇
      </Badge>
    );
  }

  if (!todos.length) {
    return (
      <Badge colorScheme='cyan' p='4' borderRadius='lg'>
        Enter New Task 👇
      </Badge>
    );
  }

  return (
    <VStack
      width="100%"
      maxW="600px"
      mx="auto"
      mb="4"
      overflowY="auto"
      maxHeight="400px"
    >
      <HStack justifyContent="space-between" mb="2">
        <Input
          flex="1"
          type="text"
          placeholder="Search todos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => setSearchTerm('')}
          colorScheme="green"
          size="sm"
          flexShrink="0"
        >
          Clear
        </Button>
      </HStack>

      <Box width="100%" overflowY="auto" maxHeight="300px">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => (
            <Box
              key={todo.id}
              width="100%"
              bg={index % 2 === 0 ? 'white' : 'gray.100'}
              p="4"
              borderRadius="md"
              boxShadow="md"
              mb="2"
              textDecoration={todo.checked ? 'line-through' : 'none'}
            >
              <HStack
                spacing="4"
                width="100%"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                p="2"
              >
                <Checkbox
                  isChecked={todo.checked}
                  onChange={() => handlecheck(todo)}
                  
                />
                <Text flex="1" textDecoration={todo.checked ? 'line-through' : 'none'}>
                  {todo.body}
                </Text>
                <Spacer />
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => editTodo(todo.id)}
                  aria-label={`Edit ${todo.body}`}
                  size={'sm'}
                />
                <Button
                  onClick={() => handleDelete(todo)}
                  leftIcon={<FaTrash />}
                  colorScheme="red"
                  size={'sm'}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))
        ) : (
          <Text style={{ textAlign: 'center' }}>No results. Create a new one instead.</Text>
        )}
      </Box>
    </VStack>
  );
};

export default TodoComponents;