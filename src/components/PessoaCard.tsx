import {StyleSheet, Text, TouchableOpacity,TouchableOpacityProps} from "react-native";
import React from "react";

interface IPessoa extends TouchableOpacityProps {
    nome: string;
    email: string;
    telefone: string;
}

export function PessoaCard({nome, email, telefone, ...rest}: IPessoa) {
    return (
        <TouchableOpacity style={styles.buttonSkill} {...rest}>
            <Text style={[styles.textSkill, {fontSize: 24}]}>
                Nome: {nome}
            </Text>
            <Text style={[styles.textSkill, {fontSize: 20}]}>
                E-mail: {email}
            </Text>
            <Text style={[styles.textSkill, {fontSize: 16}]}>
                Telefone: {telefone}
            </Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 15
    },
    textSkill: {
        color: '#fff',
        fontWeight: 'bold'
    }
})