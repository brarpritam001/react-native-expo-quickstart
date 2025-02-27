import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface InputFieldProps {
    icon: keyof typeof Ionicons.glyphMap;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputField: React.FC<InputFieldProps> = ({ icon, error, ...props }) => (
    <View style={styles.inputContainer}>
        <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
        <TextInput
            {...props}
            style={[styles.input, error && styles.inputError]}
            placeholderTextColor="#999"
        />
    </View>
);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ email?: string }>({});

    // Animation values
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.formContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <View style={styles.logoContainer}>
                    <Ionicons name="key" size={50} color="#007AFF" />
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address to receive password reset instructions
                    </Text>
                </View>

                <InputField
                    icon="mail"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    error={errors.email}
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Send Reset Instructions</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <View style={styles.backToLoginContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(auth)/login')}>
                            <Ionicons name="arrow-back" size={20} color="#007AFF" />
                            <Text style={styles.backToLoginText}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f9fafb',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    inputIcon: {
        padding: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 12,
        fontSize: 16,
        color: '#1a1a1a',
    },
    inputError: {
        borderColor: '#dc2626',
    },
    errorText: {
        color: '#dc2626',
        fontSize: 12,
        marginTop: -12,
        marginBottom: 16,
        marginLeft: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 24,
    },
    backToLoginContainer: {
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    backToLoginText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
});

export default ForgotPassword;
