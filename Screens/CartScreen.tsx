import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Switch, Text, View, ScrollView, Image, Button} from 'react-native';
import React, {useState} from "react";
import {PRESSED} from "../constants/actiontype";
import {connect} from "react-redux";

interface Props {
    title: string;
}

const mapStateToProps = (state: any) => {

    return {
        cart: state.appLoad.cart,
        cartBool: state.appLoad.cartBool,
        main: state.appLoad.data,
        switch: state.appLoad.switch,
    }};

const mapDispatchToProps = (dispatch: any) => ({

    onPress: (payload: any) =>
        dispatch({type: PRESSED, payload}),

});


const CartScreen: React.FC = (props: any) => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }

    const pressFuncPlus = (key: any) => {

        const current =  props.cart.find((obj: any) => obj.id === key);
        const index = props.cart.findIndex((obj: any) => obj.id === key);
        current.count++;
        props.cart.splice(index, 1, current);
        
        props.onPress([...props.cart])
    }

    const pressFuncMinus = (key: any) => {

        const current =  props.cart.find((obj: any) => obj.id === key);
        if (current.count === 1) {
            const index = props.cart.findIndex((obj: any) => obj.id === key);
            const current =  props.main.find((obj: any) => obj.id === key);
            current.cart = ''
            props.cart.splice(index, 1);
            props.onPress([ ...props.cart])

        } else {
        const index = props.cart.findIndex((obj: any) => obj.id === key);
        current.count--;
        props.cart.splice(index, 1, current);
        props.onPress([ ...props.cart])
        }
    }

    if (props.cartBool && !props.switch ) {
        return (

            <ScrollView>
                <View style={styles.container}>
                    {props.cart.map((obj: any) =>
                        <View  style={styles.grid} key={obj.id}>

                            <Image
                                source ={{ uri:(obj.image)}}
                                style={{width: 150, height: 150}}

                            />

                            <Text >{obj.title}</Text>
                            <Text >{obj.price}</Text>
                            <Text >X {obj.count}</Text>
                            <Button onPress={() => {pressFuncMinus(obj.id)}} title={'-1'}></Button>
                            <Button onPress={() => {pressFuncPlus(obj.id)}} title={'+1'}></Button>

                        </View>)}

                </View>
            </ScrollView>
        );
    } else { return (<View>
        <Text >Your cart is empty or ADMIN MODE</Text>
    </View>)  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    grid: {
        width:300,
        height: 300,

    },

    box: {
        width:300,
        height: 200,
        justifyContent: 'center',

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
