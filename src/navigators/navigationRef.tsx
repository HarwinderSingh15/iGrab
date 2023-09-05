import React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

// This creates a reference to the navigation object
export const navigationRef = React.createRef<NavigationContainerRef>();

// Navigate to a route by name
export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

// Push a new screen onto the stack
export const push = (name: string, params?: object) => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

// Go back in the navigation stack
export function goBack() {
  navigationRef.current?.goBack();
}
