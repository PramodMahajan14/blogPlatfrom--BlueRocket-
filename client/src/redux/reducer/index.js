import { combineReducers } from 'redux';
import { blogsReducers,selectedblogReducers,user,tokenReducers} from './blogreducer';

const reducers = combineReducers({
   auser:user,
   tokenuser:tokenReducers,
   allblogs :blogsReducers,
   blog:selectedblogReducers,
});

export default reducers;