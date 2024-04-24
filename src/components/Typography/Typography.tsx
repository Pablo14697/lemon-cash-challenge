import { Text } from 'react-native';

const COLORS = {
  darkGray: '#454545',
  mediumGray: '#888888',
  jetBlack: '#121212',
  white: '#ffffff',
  transparent: 'transparent',
  whiteSmoke: '#fafafa',
  lightGray: '#e6e6e6',
  lighterWhiteSmoke: '#f5f5f5',
  red: '#ff0000',
};

const FONT_FAMILY = {
  bold: 'NeueMontreal-Bold',
  medium: 'NeueMontreal-Medium',
  regular: 'NeueMontreal-Regular',
  light: 'NeueMontreal-Light',
};

interface Props {
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold';
  fontSize?: 12 | 14 | 16 | 24 | 36;
  color?:
    | 'darkGray'
    | 'mediumGray'
    | 'jetBlack'
    | 'white'
    | 'transparent'
    | 'whiteSmoke'
    | 'lightGray'
    | 'lighterWhiteSmoke'
    | 'red';
  children: React.ReactNode;
}

const Typography = ({
  fontWeight = 'regular',
  fontSize = 12,
  color = 'jetBlack',
  children,
}: Props) => {
  return (
    <Text
      style={{
        fontFamily: FONT_FAMILY[fontWeight],
        fontSize,
        color: COLORS[color],
      }}>
      {children}
    </Text>
  );
};

export default Typography;
