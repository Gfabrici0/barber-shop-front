import React from 'react';
import { ImageBackground } from 'react-native';
import { Text } from 'react-native';
const image = require('../../../assets/background.png');

interface CustomHeaderProps {
  title?: string;
}

function CustomHeader({ title }: CustomHeaderProps) {
  return (
    <ImageBackground source={image} style={{ height: 60 }}>
      <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
    </ImageBackground>
  );
}

export default CustomHeader;