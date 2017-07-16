export function locationReducer(state = null, action) {
  switch (action.type) {
    case 'UPDATE':
      return action.value;
      break;
    case 'CLEAR':
      return null;
      break;
    default:
      return state;
  }
}
