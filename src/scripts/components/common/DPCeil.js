import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
//   InteractionManager,//将一些耗时较长的工作安排到所有互动或动画完成之后再进行
  DeviceEventEmitter,
  Animated,
  NetInfo,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dpCeilActions from '../../actions/action/common/DPCeilAction';

// import BaseComponent from '../pages/BaseComponent';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/common/DPCeilStyle';
import ArrayUtils from '../../utils/ArrayUtils';
import { CARD_URL} from '../../utils/ConstUtils';
import * as Animatable from 'react-native-animatable';



class DPCeil extends Component{
	static navigationOptions = ({ navigation }) => ({
		header: null
	});
	constructor(props){
		super(props);
		this.state = {
			img: require('../../../images/card/noimg.jpg'),
		};

	}

	componentDidMount(){
		// super.componentDidMount();
		
		// this._onImgLoad()
	}

	//读取图片资源
	_onImgLoad = () => {
		
		// Platform.OS === 'ios' ?
		fetch(CARD_URL + this.props.data.id + '.jpg')
			.then(response => response.url)
			.catch(error => {
				this.setState({ img: require('../../../images/card/noimg.jpg') })				
			})
			.then(res => {
				this.setState({ img: { uri: res } })
			})
			.catch(error=>{
				this.setState({ img: require('../../../images/card/noimg.jpg') })
			}) 
		// : new Promise((resolve,reject)=>{
		// 	resolve(CARD_URL + this.props.data.id + '.jpg')
		// })
		// .then(res => this.setState({ img: { uri: res } }))
		// .catch(error => { this.setState({ img: require('../../../images/card/noimg.jpg') })})

	}

	//传递数据到_页面
	_cardDetail = () => {
		const {dispatch ,navigate} = this.props.navigation;
		this.props.cardDetail(
			dispatch,
			navigate,
			this.props.data
		)
	}    
	
	render(){
		let {cardLeft,common,data} = this.props;
		const {dispatch} = this.props.navigation;
		let sum = this.props.data.hp + this.props.data.attack + this.props.data.guard;
		return <View style={styles.cardCeil}>		
				<TouchableOpacity
				disabled={common.disabled} 
				onPress={this._cardDetail.bind(this)}
				activeOpacity={1}>
					<View style={GlobalStyles.line} />
					<View style={styles.container}>
						<View style={{ position: 'relative',marginRight:5}}>
							<Animatable.Image 
								style={styles.img} 
								source={this.state.img} 																
								animation={'fadeInLeft'}
								duration={400}
								delay={cardLeft.timer+200}
								onLoad={this._onImgLoad.bind(this)}
							/>
						</View>
							<Animatable.View
								style={GlobalStyles.flex_one}
								animation={'fadeIn'}
								duration={800}
								delay={cardLeft.timer}
							>
								<View style={GlobalStyles.flex_row}>
									<Text>{this.props.data.rarity}</Text>
									<Text style={styles.mar}>{this.props.data.attribute}</Text>
									<Text style={styles.mar}>{this.props.data.tag}</Text>
									<Text style={styles.mar}>{this.props.data.race.join('、')}</Text>
									<Text style={styles.mar}>{'cost：' + this.props.data.cost}</Text>
								</View>
								<View style={styles.tiaozhuan}>
									<Text>{this.props.data.name}</Text>
									<Image style={{ tintColor: common.themeColor }} source={require('../../../images/ic_tiaozhuan.png')} />								
								</View>
								<View style={styles.num}>
									<Text style={styles.dev}>{'HP ' + this.props.data.hp}</Text>
									<Text style={styles.dev}>{'攻击 ' + this.props.data.attack}</Text>
									<Text style={styles.dev}>{'防御 ' + this.props.data.guard}</Text>
									<Text style={styles.dev}>{'合计 ' + sum}</Text>
								</View>
							</Animatable.View>
					</View>
				</TouchableOpacity>
		</View> 
	}
}



export default connect(
	state => ({
		cardLeft: state.cardLeft,		
		common: state.common,
	}),
	dispatch => bindActionCreators(dpCeilActions, dispatch)
)(DPCeil);
