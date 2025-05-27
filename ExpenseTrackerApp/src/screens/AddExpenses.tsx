import React, { useState, useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpenseScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const amountInput = useRef(null);
    const categoryInput = useRef(null);
    const dateInput = useRef(null);

    const validateInputs = () => {
        const newErrors = {};

        if (!amount) newErrors.amount = 'Amount is required';
        else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
            newErrors.amount = 'Enter a valid positive number';

        if (!category) newErrors.category = 'Category is required';

        if (!date) newErrors.date = 'Date is required';
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
            newErrors.date = 'Use YYYY-MM-DD format';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddExpense = async () => {
        if (!validateInputs()) return;

        try {
            const parsedAmount = parseFloat(amount);
            const newExpense = {
                amount: parsedAmount,
                category: category.trim(),
                date: date.trim(),
                id: Date.now().toString()
            };

            let data = await AsyncStorage.getItem('expenses');
            if (!data) data = '[]';

            const expenses = JSON.parse(data);
            expenses.push(newExpense);
            await AsyncStorage.setItem('expenses', JSON.stringify(expenses));


            setAmount('');
            setCategory('');
            setDate('');
            setErrors({});
            setSuccess(true);


            setTimeout(() => {
                setSuccess(false);
            }, 4000);

        } catch (error) {
            console.error('Error:', error);
            setErrors({ submit: 'Failed to save expense. Please try again.' });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Image
                    source={require('../assets/home.png')}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
            <View style={styles.formContainer}>

                <Text style={styles.title}>Add New Expense</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount (₹)</Text>
                    <TextInput
                        ref={amountInput}
                        placeholder="e.g. 250.50"
                        value={amount}
                        keyboardType="numeric"
                        onChangeText={setAmount}
                        style={[styles.input, errors.amount && styles.errorInput]}
                        onBlur={() => validateInputs()}
                    />
                    {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        ref={categoryInput}
                        placeholder="e.g. Food, Transport"
                        value={category}
                        onChangeText={setCategory}
                        style={[styles.input, errors.category && styles.errorInput]}
                        onBlur={() => validateInputs()}
                    />
                    {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date</Text>
                    <TextInput
                        ref={dateInput}
                        placeholder="YYYY-MM-DD"
                        value={date}
                        onChangeText={setDate}
                        style={[styles.input, errors.date && styles.errorInput]}
                        onBlur={() => validateInputs()}
                    />
                    {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
                </View>

                {success && (

                    <View style={styles.successContainer}>
                        <Text style={styles.successText}>Expense added successfully!</Text>
                    </View>

                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddExpense}
                >
                    <Text style={styles.buttonText}>Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ViewExpenses')} style={styles.button}>
                    <Text style={styles.buttonText}>View Expenses</Text>
                </TouchableOpacity>



                {errors.submit && (
                    <>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errors.submit}</Text>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        marginHorizontal: 10,
        marginVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#2c3e50',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
        color: '#34495e',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
    },
    errorInput: {
        borderColor: '#e74c3c',
        backgroundColor: '#fef0ef',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    successContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#d4edda',
        borderRadius: 4,
    },
    successText: {
        color: '#155724',
        textAlign: 'center',
    },
    errorContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 4,
    },
});