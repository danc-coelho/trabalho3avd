import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Platform, FlatList} from 'react-native';
import {Button} from "../components/button";
import {PessoaCard} from "../components/PessoaCard";
import storage from '@react-native-community/async-storage'

interface IPessoa {
    id: string;
    nome: string;
    email: string;
    telefone: string;
}

export function Home() {
    const [newNome, setNewNome] = useState('');
    const [newEmail, setnewEmail] = useState('');
    const [newTelefone, setNewTelefone] = useState('');
    
    const [pessoas, setPessoas] = useState<IPessoa[]>([]);
    
    const [greeting, setGreeting] = useState('');
    
    function handleAddNewPessoa(): void {
        const data = {
          id: String(new Date().getTime()),
          nome: newNome,
          email: newEmail,
          telefone: newTelefone  
        };

        setPessoas([...pessoas, data]);

        setNewNome('');
        setnewEmail('');
        setNewTelefone('');
        
        storage.setItem('mykey', JSON.stringify(pessoas));
    }
    
    function handleRemovePessoa(id: string): void {
        setPessoas(pessoas.filter(s => s.id !== id));
    }
    
    useEffect(() => {
        const currentHour = new Date().getHours();
        
        if(currentHour >= 5 && currentHour < 12) {
            setGreeting('Bom dia');
        } else if(currentHour >= 12 && currentHour < 18){
            setGreeting('Boa tarde');
        } else {
            setGreeting('Boa noite');
        }
        
    }, []);

    useEffect(() => {
        async function loadData() {
            const storagedSkills = await storage.getItem('@myNomes:Nomes')
            if(storagedSkills){
                setPessoas(JSON.parse(storagedSkills))
            }
        }
        loadData()
    }, [])
    
    useEffect(() => {
        async function removeAll() {
            await storage.removeItem('@myNomes:Nomes')
        }
        removeAll()
    }, [])    

    useEffect (() =>{
        async function saveData(){
            await storage.setItem('@myNomes:Nomes', JSON.stringify(pessoas))
        }
        saveData()
    },[pessoas])
        
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Sistema de Cadastro</Text>
                
                <Text style={styles.greetings}>
                    {greeting}
                </Text>
                                
                <TextInput value={newNome} placeholder={'Nome'} placeholderTextColor={'#555'} style={styles.input} 
                           onChangeText={value => setNewNome(value)} />

                <TextInput value={newEmail} placeholder={'E-mail'} placeholderTextColor={'#555'} style={styles.input}
                           onChangeText={value => setnewEmail(value)} />

                <TextInput value={newTelefone} placeholder={'Telefone'} placeholderTextColor={'#555'} style={styles.input}
                           onChangeText={value => setNewTelefone(value)} keyboardType={"phone-pad"} />
                
                <Button title={'Cadastrar'} onPress={handleAddNewPessoa} />
                
                <Text style={[styles.title, { marginVertical: 30 }]}>Cadastros</Text>
                
                <FlatList showsVerticalScrollIndicator={false} data={pessoas} keyExtractor={skill => skill.id} 
                          renderItem={({item}) => <PessoaCard nome={item.nome} email={item.email} telefone={item.telefone} onPress={() => handleRemovePessoa(item.id)} />}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 12,
        marginTop: 30,
        borderRadius: 7
    },
    greetings: {
        color: '#fff',
        marginTop: 5
    }
});