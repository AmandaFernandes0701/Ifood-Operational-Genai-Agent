
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
  logoWrapper: "flex-shrink-0 mr-4",
  logoCircle: "w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#EA1D2C] font-black text-xl shadow-sm tracking-tighter",
  textGroup: "flex flex-col",
  title: "text-lg font-bold leading-tight tracking-tight",
  subtitle: "text-xs text-red-100 font-medium tracking-wide opacity-90"
};

export const inputStyles = {
  container: "p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300",
  inputWrapper: "relative flex items-center max-w-4xl mx-auto w-full",
  textInput: "w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#EA1D2C] focus:border-transparent transition-all shadow-sm disabled:opacity-50 placeholder-gray-400 dark:placeholder-gray-500",
  sendButtonBase: "absolute right-2 p-2 rounded-full transition-all duration-200",
  sendButtonActive: "bg-[#EA1D2C] text-white hover:bg-red-700 shadow-md transform hover:scale-105",
  sendButtonDisabled: "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed",
  footerWrapper: "text-center mt-2 flex justify-center gap-4",
  securityLabel: "text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold"
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
