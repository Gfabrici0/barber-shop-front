import { TouchableOpacity, View, Text} from "react-native";
import { styles } from "./styles";
import { useTheme } from "@rneui/themed";

export function DropdownMenu({ handleMenuItemPress }: { handleMenuItemPress: (screen: string) => void }) {
  const theme = useTheme();

  return (
    <View style={[styles.dropdownMenu, { backgroundColor: theme.theme.colors.secondary }]}>
      <TouchableOpacity onPress={() => handleMenuItemPress('agendamentos')}>
        <Text style={styles.menuItem}>Agendamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('profile')}>
        <Text style={styles.menuItem}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('services')}>
        <Text style={styles.menuItem}>Serviços</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('sair')}>
        <Text style={styles.menuItem}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}