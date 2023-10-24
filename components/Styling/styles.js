import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // or 'contain'
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c7ecee',
    padding: 12,
    marginBottom: 16,
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', 
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333', 
  },
  deleteText: {
    color: 'red',
  },
  emailContainer: {
    marginTop: 16
  },
  emailText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#333', 
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white', 
  },

  searchInput: {
    height: 40,
    borderColor: '#777', 
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#333', 
    padding: 12,
    borderRadius: 4,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333', 
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', 
  },
  inputField: {
    height: 40,
    borderColor: '#777', 
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
  },
  success: {
    color: 'green',
    fontSize: 16,
    marginBottom: 12,
  },

  tabBarLabel: {
    fontSize: 12,
    color: 'gray', 
  },
});

export default styles;
