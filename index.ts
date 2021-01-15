import * as child from 'child_process';

/*
 * Log the error that occurred.
 * 
 * @param {string} errorMessage The error message indicating what happened.
 * @param {Error | null} error The error object.
 * @param {string} stderr The error as printed to standard error.
 * @returns {void}
 */
function logError(errorMessage: string, error: Error | null, stderr: string): void {
  console.error(errorMessage);
  console.error(error);
  console.error(stderr);
}

/**
 * Main function.
 */
function main() {
  const downloadCommand = 'curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-darwin-amd64';
  const chmodCommand = 'chmod +x ./kubectl-argo-rollouts-darwin-amd64';
  const moveCommand = 'mv ./kubectl-argo-rollouts-darwin-amd64 /tmp/kubectl-argo-rollouts';

  child.exec(downloadCommand, function(error, _stdout, stderr) {
    // stderr is just the download progress
    if (error) {
      return logError('Problem while downloading argo', error, '');
    }
    child.exec(chmodCommand, function(error, _stdout, stderr) {
      if (error || stderr) {
        return logError('Problem while setting permissions for argo', error, stderr);
      }
      child.exec(moveCommand, function(error, _stdout, stderr) {
        if (error || stderr) {
          return logError('Problem while moving argo', error, stderr);
        }
        console.log('Done!');
      });
    });
  });
}
main();

