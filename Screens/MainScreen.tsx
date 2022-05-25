import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Image, ScrollView, Button } from 'react-native';
import { FETCHED, PRESSED, SWITCHED, UNSWITCHED } from "../constants/actiontype";
import { connect, useDispatch } from 'react-redux';
import {InitialStateType} from "../reducers/app";




const mapStateToProps = (state: any) => {

    return {
        main: state.appLoad.data,
        bool: state.appLoad.bool,
        cart: state.appLoad.cart,
        switch: state.appLoad.switch
    }};

const mapDispatchToProps = (dispatch: any) => ({
    onFetch: (payload: any) =>
        dispatch({type: FETCHED, payload}),

    onPress: (payload: any) =>
        dispatch({type: PRESSED, payload}),

    onSwitch: () =>
        dispatch({type: SWITCHED}),

    unSwitch: () =>
        dispatch({type: UNSWITCHED}),
});



const MainScreen: React.FC = (props: any) => {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);

   useEffect(() => {
        fetch(`https://fakestoreapi.com/products`)
            .then(results => results.json())
            .then(data =>  props.onFetch(data.map((obj: InitialStateType) => {obj["count"] = 0
                return obj  })))

    }, []);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        if(props.switch) {
            props.unSwitch()
        } if (!props.switch) {
            props.onSwitch()}
    }

    const pressFunc = (key: string) => {
        if (props.cart) {
            const current =  props.cart.find((obj: InitialStateType) => obj.id === key);
            if (current) {

                const current =  props.cart.find((obj: InitialStateType) => obj.id === key);
                const currentMain =  props.main.find((obj: InitialStateType) => obj.id === key);
                const index = props.cart.findIndex((obj: InitialStateType) => obj.id === key);
                const indexMain = props.main.findIndex((obj: InitialStateType) => obj.id === key);
                props.cart.splice(index, 1);
                current.count++;
                props.main.splice(indexMain, 1, currentMain);
                props.onFetch([ ...props.main])
                props.onPress([ current, ...props.cart])

            }
            else {
                const current =  props.main.find((obj: InitialStateType) => obj.id === key);
                current.count++;
                current.cart = 'Already in cart'
                props.onPress([ current, ...props.cart])
                }
        } else {
            const current =  props.main.find((obj: InitialStateType) => obj.id === key);
            current.count++
            props.onPress([current])
            current.cart = 'Already in cart'
        }

    }

    const pressSort = () => {
        props.main.sort((a: any, b: any) => (b.count > a.count) ? 1 : -1)
        props.onFetch([ ...props.main])
    }

    if (props.bool) {
    return (

        <ScrollView>
            { isEnabled ? (<Button onPress={() => {pressSort()}} title={'Sort'}></Button>): null }
            <Switch
            trackColor={{ false: "#767577", true: "#f4f3f4" }}
            thumbColor={isEnabled ? "#767577" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}/>

        <View style={styles.container}>
           {props.main.map((obj: InitialStateType) =>

                <View  style={styles.grid} key={obj.id}>

                        <Image
                            source ={{ uri:(obj.image)}}
                            style={{width: 150, height: 150}}
                            key={Math.random()}
                        />

                    <Text key={Math.random()}>{obj.title}</Text>
                    <Text key={Math.random()}>{obj.price}</Text>
                    <Text key={Math.random()}>{obj.cart}</Text>
                    { !props.switch ? (<Button key={obj.id} onPress={() => {pressFunc(obj.id)}} title={'add to cart'}></Button>): null }

                </View>)}

        </View>
        </ScrollView>
    );
    } else { return (<View></View>)  }
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

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
