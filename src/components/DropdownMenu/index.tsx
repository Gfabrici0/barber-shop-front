import { TouchableOpacity, View, Text} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles } from "./styles";

export function DropdownMenu({ handleMenuItemPress }: { handleMenuItemPress: (screen: string) => void }) {
  const theme = useTheme();

  return (
    <View style={[styles.dropdownMenu, { backgroundColor: theme.theme.colors.secondary }]}>
      <TouchableOpacity onPress={() => handleMenuItemPress('appoiment')}>
        <Text style={styles.menuItem}>Agendamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('profile')}>
        <Text style={styles.menuItem}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('barberServices')}>
        <Text style={styles.menuItem}>Serviços</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('demand')}>
        <Text style={styles.menuItem}>Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('login')}>
        <Text style={styles.menuItem}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}