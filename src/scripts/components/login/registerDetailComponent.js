import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  NativeModules, //调用自定义模块
  TextInput,
  Platform,
  TouchableOpacity,
  Modal,
  Button,
  Alert
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerDetailActions from '../../actions/action/login/registerDetailAction';

import { NavigationActions,StackNavigator } from 'react-navigation';
import ViewUtils from '../../utils/ViewUtils';
import NavigationBar from '../common/NavigationBar';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/login/registerDetailStyle';
import LoginDao from '../../repository/loginDao';
// import BackPressComponent from '../common/BackPressComponent';


class RegisterDetailComponent extends Component {

  constructor(props) {
    super(props);
    // this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)})
  }

  componentDidMount(){
    // this.backPress.componentDidMount();//组件完成装载后调用backPress相应方法注册监听
  }

  componentWillUnmount(){
    // this.backPress.componentWillUnmount();//移除监听
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps !== this.props;
  }

  onBackPress(e){
    // this.registerDetail.goBack();
    this.onBack();
    return true;//返回true告诉用户已经处理了返回事件
  }
  onBack(){
    this.props.navigation.goBack();//关闭当前页面
  }

  //昵称响应
  _onChangeNickname = (nickname) =>{
    let { registerDetail, navigation } = this.props;
    this.props.onChangeNickname(
      navigation.dispatch,
      registerDetail.img,
      nickname,
      registerDetail.signature,
      registerDetail.gender
    )
  }
  //签名响应
  _onChangeSinature = (signature) => {
    let { registerDetail, navigation } = this.props;
    this.props.onChangeSinature(
      navigation.dispatch,
      registerDetail.img,
      registerDetail.nickname,
      signature,
      registerDetail.gender
    )
  }
  //设置性别
  _setGender = (gender)=>{
    let { registerDetail, navigation } = this.props;
    this.props.setGender(
      navigation.dispatch,
      registerDetail.img,
      registerDetail.nickname,
      registerDetail.signature,
      gender
    )
  }
  //上传头像
  _onChoiceImg = ()=>{
    let { registerDetail, navigation } = this.props;    
    this.props.onChoiceImg(
      navigation.dispatch,
      registerDetail.nickname,
      registerDetail.signature,
      registerDetail.gender
    );
  }
  //保存
  _onSave = () => {

    let { registerDetail, my,navigation } = this.props;
    let data = {};

    if (registerDetail.nickname.length > 1) {
      data['nickname'] = registerDetail.nickname;
    } else data['nickname'] = my.data.nickname;

    if (registerDetail.gender !== 3) {
      data['gender'] = registerDetail.gender;
    } else data['gender'] = 3;

    if (registerDetail.signature.length > 0) {
      data['signature'] = registerDetail.signature;
    } else {
      Platform.OS === 'android' ?
        data['signature'] = my.data.signature :
        data['signature'] = "这家伙很懒，什么都没写哦~";
    }

    if (registerDetail.localIos) {
      data['local'] = registerDetail.localIos;
    }

    this.props.onSaveDetail(
      navigation,
      data,
      registerDetail.localAndroid
    )

  }

  render() {
    let {common,registerDetail,register} = this.props;
    return (
      <View>

        <Modal
          animationType={'slide'}
          transparent={true}
          visible={register.showRegisterDetail}
          // visible={true}          
          onRequestClose={()=>{}}
        >

        {/* 遮挡页面 */}
        {ViewUtils.shadow(registerDetail.shadow)}
        {/* END 遮挡页面 */}

        <View style={styles.bgColor}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <NavigationBar
                title={'完善信息'}
                leftButton={<Text/>}
                theme={'#000'}
                // rightButton={ViewUtils.rightButton(common.disabled,'跳过',()=>{          
                //   this._resetAction();
                // })}
                style={GlobalStyles.shadow}/>

              <View style={GlobalStyles.align_items_center}>          
                {registerDetail.img === '' ? 
                <TouchableOpacity activeOpacity={1} style={[styles.img,styles.imgF]} onPress={()=>this._onChoiceImg()}>
                  <Image style={styles.add} source={require('../../../images/my/add.png')}/>
                </TouchableOpacity> 
                :<TouchableOpacity activeOpacity={1} style={styles.img}  onPress={()=>this._onChoiceImg()}>                
                  <Image style={styles.imgT}  source={registerDetail.img}/>
                </TouchableOpacity>}
              </View>

              <View style={GlobalStyles.text_container}>
                <Image style={styles.ic} source={require('../../../images/ic_nickname.png')} />
                <TextInput 
                  style={[styles.textInput]}
                  ref={'nickname'}
                  maxLength = {11}
                  onChangeText={nickname => {
                    this._onChangeNickname(nickname)
                  }}
                  underlineColorAndroid={'#303537'}
                  onSubmitEditing={()=>{this.refs.signature.focus()}}
                  value={registerDetail.nickname}
                  placeholder='昵称'
                  placeholderTextColor='#cdcdcd'
                  onFocus={()=>{}}
                  onBlur={()=>{}} 
                  clearButtonMode={'always'}
                  autoCapitalize={'none'}
                />
              </View>

              <View style={GlobalStyles.text_container}>
                <Image style={styles.icSex} source={require('../../../images/ic_sex.png')} />
                <Text onPress={()=>this._setGender(1)} style={styles.gender}>男</Text>
                {registerDetail.gender==1 ? 
                <TouchableOpacity activeOpacity={1} onPress={()=>this._setGender(1)} style={styles.radio}>
                  <Image style={styles.sexImg}  source={require('../../../images/ic_sex_male.png')} />
                </TouchableOpacity> : 
                <View style={[styles.radio, styles.radioExtend]} >
                    <TouchableOpacity style={GlobalStyles.flex_one} onPress={() =>this._setGender(1)} />
                </View>}

                <Text onPress={()=>this._setGender(2)} style={styles.gender}>女</Text>
                {registerDetail.gender==2 ? 
                <TouchableOpacity activeOpacity={1} onPress={()=>this._setGender(2)} style={styles.radio}>
                  <Image style={styles.sexImg} source={require('../../../images/ic_sex_female.png')} />
                </TouchableOpacity> : 
                <View style={[styles.radio, styles.radioExtend]} >
                    <TouchableOpacity style={GlobalStyles.flex_one} onPress={() => this._setGender(2)} />
                </View>}  
              </View>

              <View style={styles.textArea}>
                <TextInput 
                  style={styles.textSign}
                  ref={'signature'} 
                  maxLength={50}
                  multiline = {true}
                  // numberOfLines = {10}
                  onChangeText={signature => {
                    this._onChangeSinature(signature)
                  }}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={()=>{}}
                  value={registerDetail.signature}
                  placeholder='个性签名~'
                  placeholderTextColor='#cdcdcd'
                  onFocus={()=>{}}
                  onBlur={()=>{}}
                  clearButtonMode={'always'}
                  autoCapitalize={'none'}
                />
              </View> 
              
              {Platform.OS === 'android' ? 
                <TouchableOpacity 
                  activeOpacity={1} 
                  disabled={registerDetail.button} 
                  onPress={() => {
                    this._onSave()
                }}>
                <Text  style={[styles.btnAndroid,
                  !registerDetail.button ? { backgroundColor: common.themeColor } : GlobalStyles.btn_disabled_true ]}>
                  保存
                </Text>
              </TouchableOpacity>
              :
                <View style={[styles.btnIos, !registerDetail.button ? { backgroundColor: common.themeColor } : GlobalStyles.btn_disabled_true]}>
                <Button
                  disabled={registerDetail.button}
                  title={'保存'}
                  onPress={() => {
                    this._onSave()
                  }} color={"#fff"}
                />
              </View>
              }
            
            </ScrollView> 
          </View>
        </Modal>
    </View>
    )
  }

}

export default connect(
  state => ({
    registerDetail: state.registerDetail,
    my: state.my,    
    common: state.common,
  }),
  dispatch => bindActionCreators(registerDetailActions, dispatch)
)(RegisterDetailComponent);


