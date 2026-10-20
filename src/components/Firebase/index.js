// Compatibility re-export: the modern implementation lives in src/firebase.
// Existing imports from '../Firebase' or './Firebase' keep working.
import FirebaseContext, {withFirebase, useFirebase} from '../../firebase/context';
import Firebase from '../../firebase/firebase';

export default Firebase;
export {FirebaseContext, withFirebase, useFirebase};
