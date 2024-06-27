import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import { styles } from './style';
import { Barbershop, Content } from '../../../services/interface/barbershop.interface';

interface BarbershopCardProps {
    barbershop: Content;
    onSelect: (barbershop: Content) => void;
    isSelected: boolean;
}

const BarbershopCard: React.FC<BarbershopCardProps> = ({ barbershop, onSelect, isSelected }) => {
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => onSelect(barbershop)}
      >
        <Text style={styles.cardTitle}>{barbershop.tradeName}</Text>
      </TouchableOpacity>
    );
};

export default BarbershopCard;