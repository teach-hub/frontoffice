import { StackProps, HStack, Text, Avatar } from '@chakra-ui/react';
import {
  Box,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuIcon,
  MenuItem,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = StackProps & {
  reviewerInfo: { name: string; lastName: string };
  availableReviewers: { id: string; name: string; lastName: string }[];
  onChangeReviewer: (reviewer: string) => void;
};

const ReviewerCard = ({
  onChangeReviewer,
  availableReviewers,
  reviewerInfo: { name, lastName },
  ...rest
}: Props) => {
  return (
    <Menu closeOnSelect>
      <MenuButton padding="0px" margin="0px">
        <HStack
          borderWidth="1px"
          borderColor="black"
          borderRadius="15px"
          justifyContent="center"
          textAlign={'left'}
          {...rest}
        >
          <Avatar name={`${name} ${lastName}`} size="md" />
          <Text maxW="50%">
            {name} {lastName}
          </Text>
        </HStack>
      </MenuButton>
      {(availableReviewers.length && (
        <MenuList>
          {availableReviewers.map((reviewer, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  console.log('Setting', reviewer);
                  return onChangeReviewer(reviewer.id);
                }}
              >
                <HStack>
                  <Avatar name={`${reviewer.name} ${reviewer.lastName}`} size="sm" />
                  <Text>
                    {reviewer.name} {reviewer.lastName}
                  </Text>
                </HStack>
              </MenuItem>
            );
          })}
        </MenuList>
      )) ||
        null}
    </Menu>
  );
};

export default ReviewerCard;
