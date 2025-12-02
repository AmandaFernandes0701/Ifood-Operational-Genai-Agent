
/**
 * Centralized Style Definitions
 * This file contains all the Tailwind CSS class groupings for the application components.
 * Keeping them here separates the styling concern from the markup/logic.
 */

export const layoutStyles = {
  // Updated: Full screen layout without padding or margins
  rootContainer: "h-screen w-full bg-gray-100 dark:bg-gray-950 font-sans transition-colors duration-300 overflow-hidden",
  
  // Updated: Occupies full space, removed rounding and shadows
  centralCard: "h-full w-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
};

export const headerStyles = {
  container: "bg-[#EA1D2C] text-white p-4 flex items-center justify-between shadow-md z-10 transition-colors duration-300",
  brandGroup: "flex items-center",
  logoWrapper: "flex-shrink-0 mr-3 md:mr-4",
  logoCircle: "w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#EA1D2C] font-black text-lg md:text-xl shadow-sm tracking-tighter",
  textGroup: "flex flex-col",
  title: "text-base md:text-lg font-bold leading-tight tracking-tight",
  subtitle: "text-[10px] md:text-xs text-red-100 font-medium tracking-wide opacity-90",
  // Updated: Always visible (flex), cursor pointer, click animation
  policyButton: "flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-xs font-semibold tracking-wide transition-all border border-white/20 hover:border-white/40 cursor-pointer active:scale-95 select-none"
};

export const inputStyles = {
  container: "p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300",
  inputWrapper: "relative flex items-end max-w-4xl mx-auto w-full",
  // Updated: pl-12 to make room for the left policy button
  textInput: "w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-3xl pl-12 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-[#EA1D2C] focus:border-transparent transition-all shadow-sm disabled:opacity-50 placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-[48px] max-h-[160px] overflow-y-auto leading-relaxed scrollbar-hide",
  sendButtonBase: "absolute right-2 bottom-2 p-2 rounded-full transition-all duration-200 z-10",
  sendButtonActive: "bg-[#EA1D2C] text-white hover:bg-red-700 shadow-md transform hover:scale-105 cursor-pointer",
  sendButtonDisabled: "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed",
  // New style for the left-side policy button
  policyButtonInput: "absolute left-2 bottom-2 p-2 rounded-full text-gray-400 hover:text-[#EA1D2C] hover:bg-red-50 dark:hover:bg-gray-700 transition-colors cursor-pointer z-10",
  footerWrapper: "text-center mt-2 flex justify-between max-w-4xl mx-auto px-2 items-center",
  securityLabel: "text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold",
  charCount: "text-[10px] text-gray-400 dark:text-gray-600 font-medium"
};

export const bubbleStyles = {
  base: "relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden transition-colors duration-300",
  botVariant: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none",
  userVariant: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-none",
  errorVariant: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
  timestampBase: "text-[10px] mt-2 opacity-60 text-right w-full",
  timestampBot: "text-gray-400 dark:text-gray-500",
  timestampUser: "text-gray-500 dark:text-gray-400"
};

export const avatarStyles = {
  base: "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold mx-2 mt-1 shadow-sm border transition-colors duration-300",
  botVariant: "bg-white dark:bg-gray-800 border-red-100 dark:border-gray-700 text-[#EA1D2C]",
  userVariant: "bg-[#EA1D2C] border-[#EA1D2C] text-white"
};

export const messageRowStyles = {
  containerBase: "flex w-full mb-4 animate-fade-in",
  alignLeft: "justify-start",
  alignRight: "justify-end",
  contentWrapperBase: "flex max-w-[90%] md:max-w-[85%]",
  rowNormal: "flex-row",
  rowReverse: "flex-row-reverse"
};

export const modalStyles = {
  // Ensure z-index is very high (z-[100]) to be above everything including header (z-10)
  overlay: "fixed inset-0 z-[100] flex items-center justify-center p-4",
  backdrop: "absolute inset-0 bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in cursor-pointer",
  container: "relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-scale-in border border-gray-200 dark:border-gray-700",
  header: "flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50",
  title: "text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2",
  closeButton: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 cursor-pointer",
  content: "flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6"
};
