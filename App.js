// @flow

import React from 'react';
import EditorsSelect from './EditorsSelect';
import * as FeatureDetection from './FeatureDetection';
import Interpreter from './Interpreter';
import ProgramTextEditor from './ProgramTextEditor';
import TextSyntax from './TextSyntax';
import TurtleGraphics from './TurtleGraphics';
import {View, Button, Text, Switch} from 'react-native';
import {styles} from './Style';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

type AppState = {
    program: Array<string>,
    programVer: number,
    numEditors: number
};

type AppContext = {
    bluetoothApiIsAvailable: boolean
};

export default class App extends React.Component<{}, AppState> {
    appContext: AppContext;
    interpreter: Interpreter;
    syntax: TextSyntax;
    turtleGraphicsRef: { current: null | TurtleGraphics };

    constructor(props: {}) {
        super(props);

        this.state = {
            program: ["forward", "left"],
            programVer: 1,
            numEditors: 1,
            liveMode: false
        };

        this.appContext = {
            bluetoothApiIsAvailable: FeatureDetection.bluetoothApiIsAvailable()
        };

        this.interpreter = new Interpreter(
            {
                forward: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.forward(40);
                    }
                },
                left: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.turnLeft(90);
                    }
                },
                right: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.turnRight(90);
                    }
                }
            }
        );

        this.syntax = new TextSyntax();

        this.turtleGraphicsRef = React.createRef<TurtleGraphics>();

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleNumEditorsChange = this.handleNumEditorsChange.bind(this);
        this.handleClickRun = this.handleClickRun.bind(this);
        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);
        this.showLiveFeedback = this.showLiveFeedback.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.getPermission = this.getPermission.bind(this);
        this.getPermission();
    }

    handleProgramChange: (Array<string>) => void;
    handleProgramChange(program: Array<string>) {
        this.setState((state) => {
            return {
                program: program,
                programVer: state.programVer + 1
            }
        });
    }

    handleNumEditorsChange: (number) => void;
    handleNumEditorsChange(numEditors: number) {
        this.setState({
            numEditors: numEditors
        });
    }

    handleClickRun: () => void;
    handleClickRun() {
        this.interpreter.run(this.state.program);
    }

    handleClickHome: () => void;
    handleClickHome() {
        if (this.turtleGraphicsRef.current !== null) {
            this.turtleGraphicsRef.current.home();
        }
    }

    handleClickClear: () => void;
    handleClickClear() {
        if (this.turtleGraphicsRef.current !== null) {
            this.turtleGraphicsRef.current.clear();
        }
    }

    showLiveFeedback: () => void;
    showLiveFeedback() {
        let lastInput = input[this.state.program[this.state.program.length]];
        if (this.validateInput(lastInput)) this.props.onChange(this.props.syntax.read(this.state.program));
        this.interpreter.run(this.state.program);
        //this.handleProgramChange();
    }

    validateInput: (text) => boolean;
    validateInput(text) {
        return text === 'forward' || text === 'left' || text === 'right';
    }

    changeMode: () => void;
    changeMode() {
        this.setState({liveMode : !this.state.liveMode});
    }

    getPermission = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Hey! You might want to enable notifications for my app, they are good.');
        } else {
            return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Switch
                    onValueChange = {this.changeMode}
                    value = {this.state.liveMode}/> */}
                <View style={styles.programTextEditorContainer}>
                    {[...Array(this.state.numEditors)].map((x, i) => {
                        return <View accessible={true} style={styles.programTextEditor} key={ i }>
                            <Text>Program: </Text>
                            <ProgramTextEditor
                                liveMode= {this.state.liveMode}
                                program={ this.state.program }
                                programVer={ this.state.programVer }
                                syntax={ this.syntax }
                                onChange={ this.handleProgramChange }
                                key={ i } />
                        </View>
                    })}
                </View>
                <View style={styles.editorSelector}>
                <EditorsSelect
                    numEditors={ this.state.numEeditors }
                    onChange={ this.handleNumEditorsChange } />
                </View>
                <View style={styles.screen}>
                    <TurtleGraphics ref={this.turtleGraphicsRef} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={styles.button}
                        onPress={this.handleClickRun}
                        title="Run"
                    />
                    <Button 
                        style={styles.button}
                        onPress={this.handleClickHome}
                        title="Home"
                    />
                    <Button 
                        style={styles.button}
                        onPress={this.handleClickClear}
                        title="Clear"
                    />
                </View>
                <View style={styles.footer}>
                    {this.appContext.bluetoothApiIsAvailable ? (
                        <Text>Bluetooth available</Text>
                    ) : (
                        <Text>Bluetooth not available</Text>
                    )}
                </View>
            </View>
        );
    }
}
