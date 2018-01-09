import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
// import ImageZoom from 'react-native-image-pan-zoom';
// // import NavigationBar from '../../common/NavigationBar';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardDetailActions from '../../actions/action/card/cardDetailAction';
import BackPressComponent from '../common/BackPressComponent';

import ImageViewer from 'react-native-image-zoom-viewer';
import styles from '../../../styles/card/cardDetailStyle';
import GlobalStyles from '../../../styles/commonStyle';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import { CARD_URL} from '../../utils/ConstUtils';
import NavigationBar from '../common/NavigationBar';



class CardDetailComponent extends Component{

	static navigationOptions = ({ navigation }) => ({
		// headerTitle: `${navigation.state.params.data.name}`
		headerTitle: navigation.state.params.data.name,
		headerRight: <Text/>,
		// tabBarVisible: false
		header:null
	});

	constructor(props){
		super(props);
		this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
	}	
	componentDidMount(){
		this.backPress.componentDidMount();//组件完成装载后调用backPress相应方法注册监听
		this._pageInit();
	}
	componentWillReceiveProps(nextProps){
		const { dispatch, state } = this.props.navigation;
		this.props.addNetInfo(dispatch, state.params.data.id)
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount();
		const {dispatch,state} = this.props.navigation;		
		this.props.removeNetInfo(dispatch,state.params.data.id)
	}
	shouldComponentUpdate(nextProps,nextState){
		return nextProps!==this.props;
	}
	onBackPress(e){
		this.props.navigation.goBack();//关闭当前页面
		return true;//返回true告诉用户已经处理了返回事件
	}
	_pageInit = () => {
		this.imageViewer = {
			imageUrls: [{ url: CARD_URL + this.props.navigation.state.params.data.id + '.jpg' }],
			onCancel: (close) => {
				this.props.onImgCancel()
			},
			onClick: () => {
				this.props.onImgCancel()
			},
			onSaveToCamera: () => { Alert.alert('保存成功') },
			onSave: (url) => {
				// this.downloadFile(url);
			},
		}
	}
	//读取图片资源
	_onImgLoad = () => {
		const { dispatch, state } = this.props.navigation;
		this.props.onImgLoad(dispatch, state.params.data.id);		
	}
	//图片显示
	_onImgShow = ()=>{
		this.props.onImgShow()
	}
	//后退
	_onBack=()=>{
		this.props.onGoBack(this.props.navigation)
	}


	discription(key,val,style=null){
		return (
			<View style={[styles.discription,style]} >
				<Text style={styles.key}>{key}</Text>
				<Text style={styles.val}>{val}</Text>
			</View>
		)
	}
	num(nkey,nval){
		return (
			<View style={GlobalStyles.flex_one}>
				<Text style={styles.nkey}>{nkey}</Text>
				<Text style={styles.nval}>{nval + ''}</Text>
			</View>
		)
	}  
	
	render(){

		let {data} = this.props.navigation.state.params;
		let {cardDetail,common} = this.props;

		let view = 
			<View style={GlobalStyles.flex_one}>

			<NavigationBar
				title={data.name}
				leftButton={ViewUtils.leftBackButton(()=>{this._onBack()})}
				theme={common.themeColor}
				style={GlobalStyles.shadow}/>
		
			<View style={styles.container}>
				<TouchableOpacity activeOpacity={1} onPress={()=>{this._onImgShow()}}>
					<Image 
						style={styles.img} 
						source={cardDetail.img} 
						onLoadEnd={this._onImgLoad.bind(this)}
					/>
				</TouchableOpacity>
				<View style={styles.discriptionTitle}>
					{this.discription('稀有度',data.rarity)}
					{this.discription('名字',data.name)}
					{this.discription('种族',data.race.join('、'))}
					{this.discription('cost',data.cost)}
				</View>
			</View>

			<View style={styles.discriptionContent}>
				{this.num('最大等级',data.maxLv)}
				{this.num('血量',data.hp)}
				{this.num('攻击',data.attack)}
				{this.num('防御',data.guard)}
				{this.num('合计',data.hp+data.attack+data.guard)}
			</View>

			{this.discription('主动技',data.mainSkill,styles.common)}
			{this.discription('子分技',data.subSkill,styles.common)}
				
			<Modal
				visible={cardDetail.shadow==0?false:true}
				animationType={"fade"}
				transparent={true}
				onRequestClose={() => { this.props.onImgCancel() }}
			>
				<ImageViewer
					{...this.imageViewer}
				/>
				{/* <ImageZoom 
					cropWidth={Dimensions.get('window').width}
					cropHeight={Dimensions.get('window').height}
					imageWidth={150}
					imageHeight={220}
					onClick={ () => this.setState({ shadow: 0 })}
				>
					<Image style={{ width: 150, height: 220 }}
						source={cardDetail.img} />
				</ImageZoom> */}
			
			</Modal>

		</View>;

		return (
			<View style={GlobalStyles.flex_one}>
				{view}
			</View>);
	}
}


export default connect(
	state => ({
		cardDetail: state.cardDetail,
		common: state.common
	}),
	dispatch => bindActionCreators(cardDetailActions, dispatch)
)(CardDetailComponent);


