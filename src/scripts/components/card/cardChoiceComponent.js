import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter,
  Modal,
  TouchableOpacity,
  Platform,
  Button,
  InteractionManager,
  StatusBar
} from 'react-native'; 

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardChoiceActions from '../../actions/action/card/cardChoiceAction';

import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/card/cardChoiceStyle';
import dpChoice from '../../../data/dpChoice.json';
import NavigationBar from '../common/NavigationBar';
import { NavigationActions } from 'react-navigation';


// const STATUS_BAR_HEIGHT = 20;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
// const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 40;

class CardChoiceComponent extends Component{
	
	constructor(props){
		super(props);
		
		this.isChoiceRarity = 'all';
		this.isChoiceAttribute = 'all';
		this.isChoiceTag = 'all';
		this.isChoiceRace = 'all';  
		
	}


	//修改筛选状态
	_onChoice(key,item){
		let { cardLeft } = this.props;
		if (key === '稀有度' && cardLeft.isChoiceRarity !== item){
			// this.setState({isChoiceRarity: item})
			this.props.onChoiceRarity(item)
		}
		else if(key==='属性' && cardLeft.isChoiceAttribute !== item){
			// this.setState({isChoiceAttribute: item})
			this.props.onChoiceAttribute(item)
		}
		else if(key==='图标' && cardLeft.isChoiceTag !== item){
			// this.setState({isChoiceTag: item})
			this.props.onChoiceTag(item)
		}
		else if(key==='种族'&& cardLeft.isChoiceRace !== item){
			// this.setState({isChoiceRace: item})
			this.props.onChoiceRace(item)
		}
	}
	_resetData = ()=> {
		const {dispatch,navigate} = this.props.navigation;
		this.props.onResetData(dispatch, navigate);
	}

	_drawerClose=()=>{
		this.props.onDrawerClose(this.props.navigation.navigate)
	}

	choiceItems(key,val){
		let {cardLeft} = this.props;
		let state = '';
		if(key==='稀有度')state = cardLeft.isChoiceRarity
		else if(key==='属性')state = cardLeft.isChoiceAttribute
		else if(key==='图标')state = cardLeft.isChoiceTag
		else if(key==='种族')state = cardLeft.isChoiceRace
			
		let arr = [<TouchableOpacity 
						activeOpacity={1} 
						onPress={() => { this._onChoice(key, 'all') }} 
						key={100} 
						style={[styles.item, state === 'all' ? styles.choiceColor : styles.choiceNoColor]}>
							<Text style={state === 'all' ? styles.choiceFontColor : styles.choiceNoFontColor}>全部</Text>
					</TouchableOpacity>];
		for(let i=0;i<val.length;i++){
			arr.push(<TouchableOpacity 
						activeOpacity={1} 
						onPress={() => { this._onChoice(key, val[i]) }} 
						key={i} 
						style={[styles.item, state === val[i] ? styles.choiceColor : styles.choiceNoColor]}>
							<Text style={state === val[i] ? styles.choiceFontColor : styles.choiceNoFontColor}>{val[i]}</Text>
					</TouchableOpacity>)
		}

		return(
			<View style={styles.choiceItems}>
				<Text>{key+':'}</Text>
				{arr}
			</View>
		)
	}


	cardChoice() {
		return (<TouchableOpacity onPress={() => { 
			this._drawerClose();
		}}>
			<Image style={styles.choiceImg} source={require('../../../images/ic_choice.png')} />
		</TouchableOpacity>);
	}

	render(){
		let {cardLeft,common} = this.props;
		return (
			<View >
				<NavigationBar
					title='筛选'
					theme={common.themeColor}
					rightButton={this.cardChoice()}
					leftButton={ <Text />}
					style={GlobalStyles.shadow} />
				<View style={styles.con}>
					{this.choiceItems('稀有度',dpChoice.rarity)}
					{this.choiceItems('属性',dpChoice.attribute)}
					{this.choiceItems('图标',dpChoice.tag)}
					{this.choiceItems('种族',dpChoice.race)}
				</View>
				<View style={[styles.container]}>
					<Button  
						onPress={()=>{this._resetData()}}  
						title="重置"  
						disabled={
							cardLeft.isChoiceRarity !=='all' ||
							cardLeft.isChoiceAttribute !== 'all' ||
							cardLeft.isChoiceTag !== 'all' ||
							cardLeft.isChoiceRace !== 'all'  ? false :true							
						}
						color={Platform.OS == 'android'?"#2196F3":"#fff" }
					/> 
				</View> 
			</View>
		)
	}
}


export default connect(
	state => ({
		cardLeft: state.cardLeft,
		common:state.common
	}),
	dispatch => bindActionCreators(cardChoiceActions, dispatch)
)(CardChoiceComponent);

