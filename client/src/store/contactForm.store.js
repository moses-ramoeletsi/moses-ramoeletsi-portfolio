import { create } from 'zustand';

const useContactStore = create((set, get) => ({
  // Form data state
  formData: {
    name: '',
    email: '',
    subject: '',
    message: ''
  },
  
  // Status state
  status: {
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  },
  
  // Update form data fields
  updateFormData: (field, value) => 
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    })),
  
  // Reset the form
  resetForm: () => 
    set({
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }),
  
  // Set status
  setStatus: (status) => 
    set({
      status
    }),
  
  // Submit form
  submitForm: async () => {
    set({
      status: {
        submitting: true,
        submitted: false,
        error: false,
        message: ''
      }
    });
    
    try {
      // Get the current formData from the store
      const formData = get().formData;
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        set({
          status: {
            submitting: false,
            submitted: true,
            error: false,
            message: data.message || 'Message sent successfully! I\'ll get back to you soon.'
          },
          formData: {
            name: '',
            email: '',
            subject: '',
            message: ''
          }
        });
      } else {
        set({
          status: {
            submitting: false,
            submitted: false,
            error: true,
            message: data.message || 'Something went wrong'
          }
        });
      }
    } catch (error) {
      set({
        status: {
          submitting: false,
          submitted: false,
          error: true,
          message: 'An error occurred while submitting the form'
        }
      });
    }
  }
}));

export default useContactStore;