import { TouchableOpacity, View, Text} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles } from "./styles";
import UserStore from "../../services/Store/UserStore";
import { useEffect, useState } from "react";

export function DropdownMenu({ handleMenuItemPress }: { handleMenuItemPress: (screen: string) => void }) {
  const theme = useTheme();
  const [userRole, setUserRole] = useState<string>();
  useEffect(()=>{
    const fetchRole = async () => {
      try {
        const role = await UserStore.getRole();
        setUserRole(role || '');
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    }
    fetchRole();
  },[])
  return (
    <View style={[styles.dropdownMenu, { backgroundColor: theme.theme.colors.secondary }]}>
      <TouchableOpacity onPress={() => handleMenuItemPress('appoiment')}>
        <Text style={styles.menuItem}>Agendamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuItemPress('profile')}>
        <Text style={styles.menuItem}>Editar perfil</Text>
      </TouchableOpacity>
      {
        userRole != 'ROLE_USER' &&
        <TouchableOpacity onPress={() => handleMenuItemPress('barberServices')}>
          <Text style={styles.menuItem}>Serviços</Text>
        </TouchableOpacity>
      }
      {
        userRole != 'ROLE_USER' &&
        <TouchableOpacity onPress={() => handleMenuItemPress('demand')}>
          <Text style={styles.menuItem}>Pedidos</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => handleMenuItemPress('login')}>
        <Text style={styles.menuItem}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}