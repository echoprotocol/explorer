import { connect } from 'react-redux';
import InternetPopup from '../../components/InternetPopup';

export default connect((state) => ({
	isConnected: state.internetPopup.get('connect'),
	isShow: state.internetPopup.get('show'),
}))(InternetPopup);
